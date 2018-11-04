const config = {};

config.aws = {};
config.aws.apiGateway = {
    url: "https://4pk6thsa0k.execute-api.us-west-2.amazonaws.com/dev",
    limit: 25,
};
config.aws.cognito = {
    region: "us-west-2",
    userPoolID: "us-west-2_Ir5Rk6L5e",
    appClientID: "7hfcfito8oqt9rdc9ujda2dn47"
};

export default config;
