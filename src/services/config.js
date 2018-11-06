const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://r1lvb3xwe1.execute-api.us-west-2.amazonaws.com/dev",
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_cNv8l5JKq",
    appClientID: "3f2ubq1u4bnft5doqfkdd82p76"
};

export default config;
