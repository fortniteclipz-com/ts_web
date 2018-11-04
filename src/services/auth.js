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
auth.isAuthenticated = false;
auth.user = null;
auth.callback = null;

auth.getToken = function () {
    return ((((auth.user || {}).signInUserSession || {}).idToken || {}).jwtToken) || null
};

auth.check = async function (callback) {
    console.log("auth | check");
    try {
        const user = await Auth.currentAuthenticatedUser();
        auth.isAuthenticated = true;
        auth.user = user;
    } catch (e) {
        console.log("auth | check | e", e);
        auth.isAuthenticated = false;
        auth.user = null;
    }
    return auth.callback && auth.callback();
};

auth.login = async function (email, password) {
    try {
        var user = await Auth.signIn(email, password);
        auth.isAuthenticated = true;
        auth.user = user;
    } catch (e) {
        console.log("auth | login | e", e);
        auth.isAuthenticated = false;
        auth.user = null;
    }
    return auth.callback && auth.callback();
};

auth.logout = async function () {
    try {
        await Auth.signOut();
    } catch (e) {
        console.log("auth | logout | e", e);
    }
    auth.isAuthenticated = false;
    auth.user = null;
    return auth.callback && auth.callback();
};

auth.register = async function (email, password) {
    try {
        await Auth.signUp({
            username: email,
            password: password,
        });
        const user = await Auth.signIn(email, password);
        auth.isAuthenticated = true;
        auth.user = user;
    } catch (e) {
        console.log("auth | register | e", e);
        auth.isAuthenticated = false;
        auth.user = null;
    }
    return auth.callback && auth.callback();
};

export default auth;
