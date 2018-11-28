let config = {
    aws: {
        apiGateway: {
            url: "https://g2girs6pi7.execute-api.us-east-2.amazonaws.com/dev",
        },
        cognito: {
            region: "us-east-2",
            userPoolID: "us-east-2_fyMog88g5",
            appClientID: "2inkittc5hciivbbh2nqf6tktb",
        },
        s3: {
            bucket: "twitch-stitch-media-dev",
            region: "us-east-2",
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
            appClientID: "4kfjgpl47kq4s93aonp6t5r5on",
        },
        s3: {
            bucket: "twitch-stitch-media-prod",
            region: "us-west-2",
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

