import {ComponentResource} from "@pulumi/pulumi";
import * as aws from '@pulumi/aws';
import {GLOBAL_TAGS, policyDoc} from "../utils/constants";

export interface S3BucketConfigs {
  name: string,
}

export default class SiteBucket extends ComponentResource {
  public bucket: aws.s3.Bucket;
  public outputs: {};

  constructor({name}: S3BucketConfigs) {
    super(`SiteBucket`, name);
    this.bucket = new aws.s3.Bucket(name, {
      website: {
        indexDocument: 'index.html',
      },
      tags: {
        Name: name,
        ...GLOBAL_TAGS
      }
    },{ parent: this });

    this.bucket.bucket.apply(bucketName => {
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


    this.outputs = {
      bucket: this.bucket.bucket,
      arn: this.bucket.arn,
      siteUrl: this.bucket.websiteEndpoint
    };
  }
}

