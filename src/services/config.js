const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://xrlt99gih7.execute-api.us-west-2.amazonaws.com/dev/sachin",
    apiKey: "VCs5sfOILU4VB39sIRhj55bZVW8HzqupXTip7n3d",
    limit: 100,
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_qahZbfDSy",
    appClientID: "3buo4mu0d11mgj268ljr785obs"
};

export default config;
