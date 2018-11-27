yarn build
aws s3 sync ./build s3://dev.fortniteclipz.com
aws s3 sync ./build s3://www.fortniteclipz.com
