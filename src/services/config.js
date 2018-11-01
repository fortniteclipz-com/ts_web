const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://c6vwx81q26.execute-api.us-west-2.amazonaws.com/dev",
    apiKey: "VCs5sfOILU4VB39sIRhj55bZVW8HzqupXTip7n3d",
    limit: 100,
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_6iB7Ex6GC",
    appClientID: "67v0hh41nalbuparq7lu9smdg8"
};

export default config;
