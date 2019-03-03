import cdk = require('@aws-cdk/cdk');

export class HelloCdkStack extends cdk.Stack {

  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    // build the stack here
  }
}
