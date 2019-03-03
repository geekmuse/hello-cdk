import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');

export class HelloCdkBase extends cdk.Stack {
  public readonly vpc: ec2.VpcNetworkRefProps;

  constructor(parent: cdk.App, name: string, props?: cdk.StackProps, env?: string) {
    super(parent, name, props);

    const maxZones = this.getContext('max_azs')[`${env}`]

    const helloCdkVpc = new ec2.VpcNetwork(this, 'VPC', {
      cidr: this.getContext('cidr_by_env')[`${env}`],
      natGateways: maxZones,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      maxAZs: maxZones,
      natGatewayPlacement: { subnetName: 'Web' },
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Web',
          subnetType: ec2.SubnetType.Public,
        },
        {
          cidrMask: 24,
          name: 'App',
          subnetType: ec2.SubnetType.Private,
        },
        {
          cidrMask: 27,
          name: 'Data',
          subnetType: ec2.SubnetType.Isolated,
        },
      ],
      tags: {
        'stack': 'HelloCdkCommon',
        'env': `${env}`,
        'costCenter': 'Shared',
        'deleteBy': 'NEVER',
      },
    });

    this.vpc = helloCdkVpc.export();
  }
}
