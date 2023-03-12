import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class SqsModule {
  public readonly sqs: AWS.SQS;

  constructor() {
    this.sqs = new AWS.SQS({
      region: 'us-east-1', // substitua pela região desejada
      apiVersion: '2012-11-05',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
}