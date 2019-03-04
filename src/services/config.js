let config = {
    env: 'dev',
    aws: {
        apiGateway: {
            url: "https://1g6q6qcqfd.execute-api.us-east-2.amazonaws.com/dev",
        },
        cognito: {
            region: "us-east-2",
            userPoolID: "us-east-2_98bISljpi",
            appClientID: "5b8ssgbp2vgrkjonl1nvpa3vm4",
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
    env: 'prod',
    aws: {
        apiGateway: {
            url: "https://lyicyo2sfj.execute-api.us-west-2.amazonaws.com/prod",
        },
        cognito: {
            region: "us-west-2",
            userPoolID: "us-west-2_U6fSa589W",
            appClientID: "71qtjojrgski9lp8l18ql9oo3b",
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

// config.aws = prodConfig.aws
if (window.location.hostname.search("www.fortniteclipz.com") > -1) {
    config = prodConfig
}

config.isDev = function () {
    return config.env === 'dev';
};

console.log("config", config);
export default config;

