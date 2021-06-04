import {ComponentResource} from "@pulumi/pulumi";
import * as aws from '@pulumi/aws';
import {GLOBAL_TAGS, policyDoc, ROOT_DOMAIN} from "../utils/constants";

export interface S3BucketConfigs {
  name: string,
  hostedZone: aws.route53.Zone,
}

export default class SiteBucket extends ComponentResource {
  public outputs: {};

  constructor({name, hostedZone}: S3BucketConfigs) {
    super(`SiteBucket`, name);
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

    bucket.websiteEndpoint.apply(console.log)

    let dns = new aws.route53.Record(`${name}-alias`, {
      type: 'A',
      name: `${name}.${ROOT_DOMAIN}`,
      zoneId: hostedZone.zoneId,
      aliases: [{
        evaluateTargetHealth: true,
        name: bucket.websiteEndpoint,
        zoneId: bucket.hostedZoneId,
      }],
    });

    this.outputs = {
      bucket: bucket.bucket,
      arn: bucket.arn,
      siteUrl: dns.name,
    };
  }
}

