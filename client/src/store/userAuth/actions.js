import { history } from '../../services/history';
import authService from '../../services/auth.service';

//export async function userLoginValidate(userLogin, dispatch){
    export const userLoginValidate = (userLogin) => async dispatch => {
    console.log('useLogin action');              
            const loginResult = await authService.loginDb(userLogin);
            console.log('loginResult: ', loginResult);
            
            let user;
            if(!loginResult.data.error){
                user = loginResult.data.user;
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });
                appRoute("/userinfo");           
            }
            else{
                dispatch({ type: 'LOGIN_FAILURE', payload: loginResult.data.error })
            }                 
}

 function appRoute(route){
    history.push(route);
}
