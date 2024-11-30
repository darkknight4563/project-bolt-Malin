# Deployment Guide for Malin Mental Health Platform

This guide explains how to deploy the Malin Mental Health Platform using AWS Lambda and PostgreSQL.

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI installed and configured
3. Node.js 18.x or later
4. PostgreSQL database (AWS RDS or Heroku)

## Environment Setup

1. Create environment files for different stages:

`.env.dev`:
```env
NODE_ENV=development
DATABASE_URL=your-dev-database-url
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
ENCRYPTION_IV=your-encryption-iv
```

`.env.prod`:
```env
NODE_ENV=production
DATABASE_URL=your-prod-database-url
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
ENCRYPTION_IV=your-encryption-iv
```

2. Store sensitive values in AWS Systems Manager Parameter Store:
```bash
# For development
aws ssm put-parameter --name "/malin/dev/database_url" --value "your-dev-database-url" --type SecureString
aws ssm put-parameter --name "/malin/dev/jwt_secret" --value "your-jwt-secret" --type SecureString
aws ssm put-parameter --name "/malin/dev/encryption_key" --value "your-encryption-key" --type SecureString
aws ssm put-parameter --name "/malin/dev/encryption_iv" --value "your-encryption-iv" --type SecureString

# For production
aws ssm put-parameter --name "/malin/prod/database_url" --value "your-prod-database-url" --type SecureString
aws ssm put-parameter --name "/malin/prod/jwt_secret" --value "your-jwt-secret" --type SecureString
aws ssm put-parameter --name "/malin/prod/encryption_key" --value "your-encryption-key" --type SecureString
aws ssm put-parameter --name "/malin/prod/encryption_iv" --value "your-encryption-iv" --type SecureString
```

## Database Setup

1. Create a PostgreSQL database:
   - AWS RDS: Create a new PostgreSQL instance in your desired region
   - Heroku: Create a new Heroku PostgreSQL addon

2. Update the DATABASE_URL in your environment files and AWS Parameter Store

## Deployment Steps

1. Build the Lambda package:
```bash
npm run build:lambda
```

2. Deploy to development:
```bash
npm run deploy:dev
```

3. Deploy to production:
```bash
npm run deploy:prod
```

## Local Development

1. Start the Lambda function locally:
```bash
npm run start:lambda
```

2. Test the API endpoints:
```bash
curl http://localhost:4000/health
```

## Monitoring and Maintenance

1. View Lambda logs:
```bash
serverless logs -f api -t
```

2. Monitor the application:
- Use AWS CloudWatch for logs and metrics
- Set up CloudWatch Alarms for error rates and latency
- Configure X-Ray for tracing (optional)

## Security Considerations

1. Ensure RDS security groups are properly configured
2. Use AWS WAF to protect your API Gateway
3. Regularly rotate encryption keys and secrets
4. Enable AWS CloudTrail for audit logging
5. Use AWS Secrets Manager for sensitive credentials

## Scaling

The serverless setup will automatically scale based on demand. However, consider:
1. RDS instance size and connection limits
2. Lambda concurrent execution limits
3. API Gateway throttling settings

## Troubleshooting

Common issues and solutions:
1. Database connection timeouts:
   - Check security groups
   - Verify DATABASE_URL
   - Check RDS instance status

2. Lambda cold starts:
   - Consider using Provisioned Concurrency
   - Optimize Lambda package size

3. Memory issues:
   - Increase Lambda memory allocation
   - Optimize database queries

## Backup and Recovery

1. Enable automated RDS backups
2. Set up point-in-time recovery
3. Regularly test backup restoration
4. Document recovery procedures

## Cost Optimization

1. Monitor AWS costs regularly
2. Use AWS Cost Explorer to identify expensive resources
3. Consider reserved instances for RDS if usage is predictable
4. Set up AWS Budgets for cost alerts
