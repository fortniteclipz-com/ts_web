const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://e4wa71y4vh.execute-api.us-west-2.amazonaws.com/dev",
    limit: 25,
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_QLg1pTv5Y",
    appClientID: "4e5466i8eoj1mtc85714di529b"
};

export default config;
