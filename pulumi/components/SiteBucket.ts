import {ComponentResource} from "@pulumi/pulumi";
import * as aws from '@pulumi/aws';
import {GLOBAL_TAGS, policyDoc, ROOT_DOMAIN} from "../utils/constants";
import TLSCertificate from "./TLSCertificate";

export interface S3BucketConfigs {
  name: string,
  hostedZone: aws.route53.Zone,
}

export default class SiteBucket extends ComponentResource {
  public outputs: {};

  constructor({name, hostedZone}: S3BucketConfigs) {
    super(`SiteBucket`, name);
    let dnsName = `${name}.${ROOT_DOMAIN}`;

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
    });

    const distributionArgs: aws.cloudfront.DistributionArgs = {
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
        acmCertificateArn: certificate.arn,
        sslSupportMethod: "sni-only",
      },
    };

    const cdn = new aws.cloudfront.Distribution(`${name}-cdn`, distributionArgs);

    let dns = new aws.route53.Record(`${name}-alias`, {
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

