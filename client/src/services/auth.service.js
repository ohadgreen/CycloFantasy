// import _ from 'lodash';
import axios from 'axios';

const baseUrl = '/api/auth/'; 

class AuthService {
    async loginDb(userLogin) {
        console.log('login db');
        const getUserUrl = `${baseUrl}/user`;
        const response = await axios({
            url: getUserUrl,
            params: userLogin,
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        // console.log('auth.service res: ' + JSON.stringify(response));
        if (!response.status === 200) {
            console.log('response:' + response);
            return { error: response.statusText }
        }
        else {
            if(response.data.error){
                console.log('login error: ' + response.data.error);
                return{ error: response.data.error };
                
            }
            else {
            const user = response.data;            
            if (user.data.token){
                const verifiedUser = JSON.stringify(response.data);
                console.log('verifideUser: ', verifiedUser);
                // localStorage.setItem('user', verifiedUser);
                return { user: response.data };
            }
        }
        }
    }

    async registerDb(user) {
        const postRegisterUrl = `${baseUrl}/user`;
        const response = await axios({
            url: postRegisterUrl,
            params: user,
            method: 'POST',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.status === 200) {
            console.log('response:' + response);
            return { error: response.text }
        }
        else {
            const registeredUser = JSON.stringify(response.data);
            console.log('registeredUser: ', registeredUser);
            localStorage.setItem('user', registeredUser);
            return { data: response.data };
        }
    }
}

export default new AuthService();