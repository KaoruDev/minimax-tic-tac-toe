import * as pulumi from "@pulumi/pulumi";
import {ComponentResource, Output} from "@pulumi/pulumi";
import * as aws from '@pulumi/aws';
import {GLOBAL_TAGS, policyDoc} from "../utils/constants";
import TLSCertificate from "./TLSCertificate";

export interface S3BucketConfigs {
  name: string, // Canonical name of the S3 bucket.
  hostedZone: aws.route53.Zone, // The DNS Zone to create the subdomain in.
}

/**
 * Responsible for creating:
 *  - An S3 bucket configured to host web site.
 *  - A CDN to server the content and provide TLS of a custom domain.
 *  - Custom subdomain record in the specified hostedZone
 *  - TLS Certificate and automated verification.
 */
export default class SiteBucket extends ComponentResource {
  public outputs: {};

  constructor({name, hostedZone}: S3BucketConfigs) {
    super(`SiteBucket`, name);
    let dnsName: Output<string> = pulumi.interpolate `${name}.${hostedZone.name}`;

    let bucket = new aws.s3.Bucket(name, {
      website: {
        indexDocument: 'index.html',
      },
      tags: {
        Name: name,
        ...GLOBAL_TAGS
      }
    },{ parent: this });

    bucket.bucket.apply(bucketName => {
      new aws.s3.BucketPolicy('open-read-access', {
        bucket: bucketName,
        policy: JSON.stringify(policyDoc([{
          Effect: 'Allow',
          Principal: '*',
          Action: [
            's3:GetObject'
          ],
          Resource: [
            `arn:aws:s3:::${bucketName}/*`
          ]
        }]))
      }, { parent: this });
    });

    const certificate = new TLSCertificate({
      name: `${name}-certificate`,
      targetDomain: dnsName,
      hostedZone,
    }, this);

    const cdn = new aws.cloudfront.Distribution(`${name}-cdn`, createCDNArgs(dnsName, bucket, certificate.arn));

    const dns = new aws.route53.Record(`${name}-alias`, {
      type: 'A',
      name: dnsName,
      zoneId: hostedZone.zoneId,
      aliases: [{
        evaluateTargetHealth: true,
        name: cdn.domainName,
        zoneId: cdn.hostedZoneId,
      }],
    });

    this.outputs = {
      bucket: bucket.bucket,
      arn: bucket.arn,
      siteUrl: dns.name,
      cdnDns: cdn.domainName,
    };
  }
}

/**
 * Returns default arguments to configure a CDN.
 *
 * @param dnsName - Custom FQDN to use as an alias of the CDN
 * @param bucket - S3 bucket hosting the content of the CDN
 * @param certificateArn - ARN of a TLS Certificate for the custom domain.
 */
function createCDNArgs(
  dnsName: Output<string>,
  bucket: aws.s3.Bucket,
  certificateArn: Output<string>,
): aws.cloudfront.DistributionArgs {
  return {
    enabled: true,
    aliases: [dnsName],
    origins: [
      {
        originId: bucket.arn,
        domainName: bucket.websiteEndpoint,
        customOriginConfig: {
          originProtocolPolicy: "http-only",
          httpPort: 80,
          httpsPort: 443,
          originSslProtocols: ["TLSv1.2"],
        },
      },
    ],
    defaultRootObject: "index.html",
    defaultCacheBehavior: {
      targetOriginId: bucket.arn,

      viewerProtocolPolicy: "redirect-to-https",
      allowedMethods: ["GET", "HEAD", "OPTIONS"],
      cachedMethods: ["GET", "HEAD", "OPTIONS"],

      forwardedValues: {
        cookies: { forward: "none" },
        queryString: false,
      },

      minTtl: 0,
      defaultTtl: 60 * 10,
      maxTtl: 60 * 10,
    },
    priceClass: "PriceClass_100",

    restrictions: {
      geoRestriction: {
        restrictionType: "none",
      },
    },

    viewerCertificate: {
      acmCertificateArn: certificateArn,
      sslSupportMethod: "sni-only",
    },
  };

}