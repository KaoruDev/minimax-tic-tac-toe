import SiteBucket from "./components/SiteBucket";
import * as aws from '@pulumi/aws';
import {GLOBAL_TAGS, ROOT_DOMAIN} from "./utils/constants";

const hostedZone = new aws.route53.Zone('hosted-zone', {
  forceDestroy: true,
  comment: `${ROOT_DOMAIN} hosted zone`,
  name: ROOT_DOMAIN,
  tags: GLOBAL_TAGS
});

const tictactoeBucket = new SiteBucket({
  name: 'unbeatable-tic-tac-toe',
  hostedZone,
});

exports.tictactoeBucket = tictactoeBucket.outputs;
