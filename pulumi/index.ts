import SiteBucket from "./components/SiteBucket";
import * as aws from '@pulumi/aws';
import {GLOBAL_TAGS, ROOT_DOMAIN} from "./utils/constants";

// Sets up Route53 Hosted Zone. Note that Nameserver configurations are managed outside of Pulumi
const hostedZone = new aws.route53.Zone('hosted-zone', {
  forceDestroy: true,
  comment: `${ROOT_DOMAIN} hosted zone`,
  name: ROOT_DOMAIN,
  tags: GLOBAL_TAGS
});

exports.hostedZone = {
  name: hostedZone.name,
  nameServers: hostedZone.nameServers,
  zoneId: hostedZone.zoneId,
};

// S3 Bucket and CDN configurations to host website.
const tictactoeBucket = new SiteBucket({
  name: 'unbeatable-tic-tac-toe',
  hostedZone,
});

exports.tictactoeBucket = tictactoeBucket.outputs;
