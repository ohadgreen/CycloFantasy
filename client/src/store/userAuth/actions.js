import { history } from '../../services/history';
import * as authService from '../../services/auth.service';


export function userLogin(username, password){
    console.log('userLogin action', username, password);
    
    try{
        const loginResult = authService.login(username, password);
        console.log('loginResult: ' + loginResult.user);
        
        if (loginResult.result === 'success'){
            loginSuccess(loginResult);
            appRoute("/userinfo");
        }
        if (loginResult.result === 'nouser') {
            return ({ type: 'LOGIN_FAILURE', payload: loginResult })
        }
        if (loginResult.result === 'pwMismatch') {
            return ({ type: 'LOGIN_FAILURE', payload: loginResult })
        }
    }
    catch(error) {
        console.log(error);        
    }
}

function loginSuccess(loginResult) {
    return ({ type: 'LOGIN_SUCCESS', payload: loginResult })
}
 function appRoute(route){
    history.push(route);
}
