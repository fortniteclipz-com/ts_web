let config = {
    aws: {
        apiGateway: {
            url: "https://rzqepv0qad.execute-api.us-east-1.amazonaws.com/dev",
        },
        cognito: {
            region: "us-east-1",
            userPoolID: "us-east-1_BaQUjvUy8",
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
            url: "to_do",
        },
        cognito: {
            region: "us-west-2",
            userPoolID: "us-west-2_bPZtQtQVv",
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

