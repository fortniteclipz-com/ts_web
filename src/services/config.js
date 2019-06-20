let config = {
    env: 'dev',
    aws: {
        apiGateway: {
            url: "https://436exd49ol.execute-api.us-east-1.amazonaws.com/dev",
        },
        cognito: {
            region: "us-east-1",
            userPoolID: "us-east-1_Cgw7qJbkY",
            appClientID: "5mq5731dhtr7dvqittniqu40rk",
        },
        s3: {
            bucket: "ts-media-dev",
            region: "us-east-1",
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
            url: "https://3gee2m4wq6.execute-api.us-west-2.amazonaws.com/prod",
        },
        cognito: {
            region: "us-west-2",
            userPoolID: "us-west-2_h8vDnM3vq",
            appClientID: "1d3a4oil31tm1otm4r3cmkec26",
        },
        s3: {
            bucket: "ts-media-prod",
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

