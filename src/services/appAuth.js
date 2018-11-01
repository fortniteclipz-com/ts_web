import Amplify, { Auth } from 'aws-amplify';

import config from './config';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.aws.cognito.region,
        userPoolId: config.aws.cognito.userPoolId,
        userPoolWebClientId: config.aws.cognito.appClientID,
    },
});

const appAuth = {}

appAuth.signUp = function(email, password) {
    Auth.signUp({
        username: email,
        password: password,
    });
}

export default appAuth;
