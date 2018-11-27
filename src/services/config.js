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
    },
};

const prodConfig = {
    aws: {
        apiGateway: {
            url: "sachin was here",
        },
        cognito: {
            region: "us-west-2",
            userPoolID: "us-west-2_bPZtQtQVv",
            appClientID: "4kuqa0k0dna98ao6tt57bmbcck",
        },
    },
};

if (window.location.hostname.search("www.fortniteclipz.com")) {
    config = prodConfig
}

console.log("config", config);
export default config;

