import Amplify, { Auth } from 'aws-amplify';

import analytics from './analytics';
import config from './config';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.aws.cognito.region,
        userPoolId: config.aws.cognito.userPoolID,
        userPoolWebClientId: config.aws.cognito.appClientID,
    },
});

const auth = {
    'user': null,
};

auth.isAuthenticated = function () {
    return auth.user !== null;
};

auth.getToken = function() {
    return ((((auth.user || {}).signInUserSession || {}).idToken || {}).jwtToken) || null
};

auth.check = async function() {
    try {
        const user = await Auth.currentAuthenticatedUser();
        auth.set(user);
        analytics.setUserId(user.attributes.sub);
    } catch (e) {
        console.log("auth | check | e", e);
        auth.user = null;
    }
    return;
};

auth.set = function(user) {
    auth.user = user;
};

auth.clear = async function() {
    auth.user = null;
    await Auth.signOut();
};

export default auth;
