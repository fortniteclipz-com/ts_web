const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://xrlt99gih7.execute-api.us-west-2.amazonaws.com/dev",
    apiKey: "VCs5sfOILU4VB39sIRhj55bZVW8HzqupXTip7n3d",
    limit: 100,
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_MQj7stfaV",
    appClientID: "3v69eiv1b3ivfa4gh4dj1o92r2"
};

export default config;
