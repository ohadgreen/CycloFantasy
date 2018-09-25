import _ from 'lodash';
import axios from 'axios';
import userSample from './user.sample';

const baseUrl = '/api/auth/';

class AuthService {
    async loginDb(userLogin) {        
        const getUserUrl = `${baseUrl}/user`;
        const response = await axios({
            url: getUserUrl,
            params: userLogin,
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.status === 200) {
            console.log('response:' + response);    
            return { error: response.statusText }    
        }
        else{
            console.log('service user: ', response.data);            
            return { data: response.data };
        }        
}

 login(username, password) {
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
}

export default new AuthService();