let config = {
    aws: {
        apiGateway: {
            url: "https://4d9um63tva.execute-api.us-east-1.amazonaws.com/dev",
        },
        cognito: {
            region: "us-east-1",
            userPoolID: "us-east-1_Hg3i3V7Gd",
            appClientID: "2mr7ing3kqal8ajcpnddgq9i7v",
        },
        s3: {
            bucket: "twitch-stitch-media-dev",
        },
    },
    ga: {
        trackingID:'UA-129317052-1',
    }
};

const prodConfig = {
    aws: {
        apiGateway: {
            url: "https://w5px4kjqwd.execute-api.us-west-2.amazonaws.com/prod",
        },
        cognito: {
            region: "us-west-2",
            userPoolID: "us-west-2_eowfgVCk9",
            appClientID: "4kuqa0k0dna98ao6tt57bmbcck",
        },
        s3: {
            bucket: "twitch-stitch-media-prod",
        },
    },
    ga: {
        trackingID:'UA-129317052-1',
    }
};

if (window.location.hostname.search("www.fortniteclipz.com") > -1) {
    config = prodConfig
}

console.log("config", config);
export default config;

