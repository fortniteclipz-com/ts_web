echo "building to ${1:-dev}"
yarn build

if [ $1 == 'prod' ]; then
    echo "deloying to prod"
    aws s3 sync ./build s3://www.fortniteclipz.com
else
    echo "deloying to dev"
    aws s3 sync ./build s3://dev.fortniteclipz.com
fi
