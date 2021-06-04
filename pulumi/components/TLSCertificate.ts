import {ComponentResource, Input, Output} from "@pulumi/pulumi";
import * as aws from '@pulumi/aws';

export interface TLSCertificateArgs {
  name: string,
  targetDomain: Input<string>,
  hostedZone: aws.route53.Zone,
}

export default class TLSCertificate extends ComponentResource {
  arn: Output<string>

  constructor({ name, targetDomain, hostedZone }: TLSCertificateArgs, parent?: ComponentResource) {
    super(`tls`, name, { parent });

    const certificate = new aws.acm.Certificate("certificate", {
      domainName: targetDomain,
      validationMethod: "DNS",
    }, { parent: this });
    this.arn = certificate.arn;

    const certificateValidationDomain = new aws.route53.Record(`${targetDomain}-validation`, {
      name: certificate.domainValidationOptions[0].resourceRecordName,
      zoneId: hostedZone.zoneId,
      type: certificate.domainValidationOptions[0].resourceRecordType,
      records: [certificate.domainValidationOptions[0].resourceRecordValue],
      ttl: 600,
    }, { parent: this });

    new aws.acm.CertificateValidation("certificateValidation", {
      certificateArn: certificate.arn,
      validationRecordFqdns: [certificateValidationDomain.name],
    }, { parent: this });
  }
}