let config = {
    aws: {
        apiGateway: {
            url: "https://tyijicjf25.execute-api.us-east-2.amazonaws.com/dev",
        },
        cognito: {
            region: "us-east-2",
            userPoolID: "us-east-2_Axx0S6WLX",
            appClientID: "5hl94c8i06g1cvmd5l52n6neal",
        },
        s3: {
            bucket: "twitch-stitch-media-dev",
            region: "us-east-2",
        },
    },
    ga: {
        trackingID:'UA-129317052-1',
    },
    tawk: {
        siteId: '5c08c694fd65052a5c93ffa4',
    },
};

const prodConfig = {
    aws: {
        apiGateway: {
            url: "",
        },
        cognito: {
            region: "",
            userPoolID: "",
            appClientID: "",
        },
        s3: {
            bucket: "twitch-stitch-media-prod",
            region: "us-west-2",
        },
    },
    ga: {
        trackingID:'UA-129317052-2',
    },
    tawk: {
        siteId: '5c08c859fd65052a5c93ffd9',
    },
};

if (window.location.hostname.search("www.fortniteclipz.com") > -1) {
    config = prodConfig
}

console.log("config", config);
export default config;

