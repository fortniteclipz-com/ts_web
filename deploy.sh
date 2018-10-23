yarn build
aws s3 sync ./build s3://twitch-stitch-react
