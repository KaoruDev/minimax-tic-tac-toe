import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as path from "path";

export const PULUMI_PROJECT = pulumi.getProject();
export const PULUMI_STACK = pulumi.getStack();

export const GLOBAL_TAGS = {
  pulumi_project: PULUMI_PROJECT,
  pulumi_stack: PULUMI_STACK
};

export const TIC_TAC_TOE_BUILD_DIR = path.join(__dirname, '../tic_tac_toe/build');

export const policyDoc = (statements: aws.iam.PolicyStatement[]): aws.iam.PolicyDocument => {
  return {
    Version: '2012-10-17',
    Statement: statements,
  }
}
