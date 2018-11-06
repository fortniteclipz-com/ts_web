const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://hmac6ewf0i.execute-api.us-west-2.amazonaws.com/dev",
    limit: 25,
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_gOan07PgP",
    appClientID: "ov5rsu9s855h715slkamm6s3b"
};

export default config;
