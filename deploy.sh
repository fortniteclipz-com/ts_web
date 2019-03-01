echo "environment: ${1:-dev}"

if [[ $1 == 'prod' ]]; then
    echo "deloying to prod"
    if git diff-index --quiet HEAD; then
        yarn build
        aws s3 sync ./build s3://www.fortniteclipz.com

        IFS='. ' read -r -a array <<< $(git describe --tags $(git rev-list --tags --max-count=1))
        array[2]="$((array[2] + 1))"
        function join { local IFS="$1"; shift; echo "$*"; }
        version=$(join . ${array[@]})
        git tag -a $version -m ""
    else
        echo 'ERROR: Untracked Commits'
    fi
else
    echo "deloying to dev"
    yarn build
    aws s3 sync ./build s3://dev.fortniteclipz.com
fi
