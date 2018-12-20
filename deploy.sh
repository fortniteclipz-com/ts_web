echo "building to ${1:-dev}"
yarn build

if [ $1 == 'prod' ]; then
    echo "deloying to prod"
    aws s3 sync ./build s3://www.fortniteclipz.com
else
    echo "deloying to dev"
    aws s3 sync ./build s3://dev.fortniteclipz.com

    IFS='. ' read -r -a array <<< $(git describe --tags $(git rev-list --tags --max-count=1))
    array[2]="$((array[2] + 1))"
    function join { local IFS="$1"; shift; echo "$*"; }
    version=$(join . ${array[@]})
    git tag -a $version -m ""
fi
