import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');

import { SubnetType } from '@aws-cdk/aws-ec2';

export class HelloCdkStack extends cdk.Stack {
  public vpc: ec2.VpcNetworkRefProps;

  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    // custom code
    let maxZones = 3;

    const helloCdkVpc = new ec2.VpcNetwork(this, 'HelloCdkVpc', {
      cidr: '10.0.0.0/16',
      natGateways: maxZones,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      maxAZs: maxZones,
      natGatewayPlacement: { subnetName: 'DMZ' },
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'DMZ',
          subnetType: SubnetType.Public,
        },
        {
          cidrMask: 24,
          name: 'Presentation',
          subnetType: SubnetType.Private,
        },
        {
          cidrMask: 24,
          name: 'App',
          subnetType: SubnetType.Private,
        },
        {
          cidrMask: 27,
          name: 'Data',
          subnetType: SubnetType.Isolated,
        },
      ],
    });

    this.vpc = helloCdkVpc.export();
  }
}
