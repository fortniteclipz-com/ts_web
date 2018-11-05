const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://xoa9rjqodl.execute-api.us-west-2.amazonaws.com/dev",
    limit: 25,
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_SeAkMOMPt",
    appClientID: "67qqmhkdqs3q6hmlgem5mub7o"
};

export default config;
