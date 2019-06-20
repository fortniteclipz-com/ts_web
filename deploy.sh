# deploy
ts_env=${1:-'dev'}
echo "deploy | start | ts_env=$ts_env"

if [[ $1 == 'prod' ]]; then
    if git diff-index --quiet HEAD; then
        yarn build
        aws s3 sync ./build s3://www.fortniteclipz.com --profile sls-fortniteclipz

        IFS='. ' read -r -a array <<< $(git describe --tags $(git rev-list --tags --max-count=1))
        array[2]="$((array[2] + 1))"
        function join { local IFS="$1"; shift; echo "$*"; }
        version=$(join . ${array[@]})
        git tag -a $version -m ""
    else
        echo 'deploy | error | untracked commits | ts_env=$ts_env'
    fi
else
    yarn build
    aws s3 sync ./build s3://dev.fortniteclipz.com --profile sls-fortniteclipz
fi

echo "deploy | done | ts_env=$ts_env"

