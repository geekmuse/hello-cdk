#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { HelloCdkBase } from '../lib/hello-cdk-base';
// import { HelloCdkStack } from '../lib/hello-cdk-stack';

const app = new cdk.App();
const stackName = 'HelloCdkBase-' + app.getContext('ENV')
new HelloCdkBase(app, stackName, {}, app.getContext('ENV'));
app.run();
