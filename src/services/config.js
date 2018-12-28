let config = {
    env: 'dev',
    aws: {
        apiGateway: {
            url: "https://ygamo6kug0.execute-api.us-east-2.amazonaws.com/dev",
        },
        cognito: {
            region: "us-east-2",
            userPoolID: "us-east-2_N2uwzTRn4",
            appClientID: "2tavh6mqc8vu64b51367uq36hu",
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
            url: "https://zfns2yas58.execute-api.us-west-2.amazonaws.com/prod",
        },
        cognito: {
            region: "us-west-2",
            userPoolID: "us-west-2_0qakh8atg",
            appClientID: "5a0jnlfso72tts2r7osmqif51o",
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

config.aws = prodConfig.aws
if (window.location.hostname.search("www.fortniteclipz.com") > -1) {
    config = prodConfig
}

config.isDev = function () {
    return config.env === 'dev';
};

console.log("config", config);
export default config;

