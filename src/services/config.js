const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://xrlt99gih7.execute-api.us-west-2.amazonaws.com/dev",
    apiKey: "VCs5sfOILU4VB39sIRhj55bZVW8HzqupXTip7n3d",
    limit: 100,
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_5LlcNApaG",
    appClientID: "20mn57v1c85veoj5spk71mc7a1"
};

export default config;
