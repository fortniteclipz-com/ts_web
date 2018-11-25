import Amplify, { Auth } from 'aws-amplify';
import ReactGA from 'react-ga';

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
    'isAuthenticated': undefined,
    'user': null,
};

auth.getToken = function() {
    return ((((auth.user || {}).signInUserSession || {}).idToken || {}).jwtToken) || null
};

auth.check = async function() {
    try {
        const user = await Auth.currentAuthenticatedUser();
        auth.set(user);
        ReactGA.set({
            userId: user.attributes.sub,
        });
    } catch (e) {
        console.log("auth | check | e", e);
        auth.isAuthenticated = false;
        auth.user = null;
    }
    return;
};

auth.set = function(user) {
    auth.isAuthenticated = true;
    auth.user = user;
};

auth.clear = async function() {
    auth.isAuthenticated = false;
    auth.user = null;
    await Auth.signOut();
};

export default auth;
