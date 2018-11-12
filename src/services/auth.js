import Amplify, { Auth } from 'aws-amplify';

import config from './config';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.aws.cognito.region,
        userPoolId: config.aws.cognito.userPoolID,
        userPoolWebClientId: config.aws.cognito.appClientID,
    },
});

const auth = {};
auth.isAuthenticated = undefined;
auth.user = null;
auth.callback = null;

auth.getToken = function () {
    return ((((auth.user || {}).signInUserSession || {}).idToken || {}).jwtToken) || null
};

auth.check = async function (callback) {
    console.log("auth | check");
    window.Auth = Auth;
    try {
        const user = await Auth.currentAuthenticatedUser();
        auth.isAuthenticated = true;
        auth.user = user;
    } catch (e) {
        console.log("auth | check | e", e);
        auth.isAuthenticated = false;
        auth.user = null;
    }
    return;
};

auth.set = async function (email, password) {
    var user = await Auth.signIn(email, password);
    auth.isAuthenticated = true;
    auth.user = user;
};

auth.clear = async function () {
    auth.isAuthenticated = false;
    auth.user = null;
    await Auth.signOut();
};

export default auth;
