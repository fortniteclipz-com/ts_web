const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://rpefp5q8x3.execute-api.us-west-2.amazonaws.com/dev",
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_BXmChx8oG",
    appClientID: "7b4fueace16g2fn2gnsv7tkis"
};

export default config;
