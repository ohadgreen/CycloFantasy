import _ from 'lodash';
import userSample from './user.sample';

export function login(username, password) {
    let loginResult = {
        user: undefined,
        result: '',
    }
    const user = _.filter(userSample, function (user) {
        return user.userName === username;
    })[0];

    if (!user) {
        const resNotExists = 'nouser'
        console.log(resNotExists);
        loginResult.result = resNotExists;
    }
    else {
        if (user.password === password) {
            const resLoginSuccess = 'success'
            console.log(resLoginSuccess);
            loginResult.user = user;
            loginResult.result = resLoginSuccess;
        }
        else {
            const resPwMismatch = 'pwMismatch'
            console.log(resPwMismatch);
            loginResult.result = resPwMismatch;
        }
    }
    return loginResult;
}