import { history } from '../../services/history';
import authService from '../../services/auth.service';

    export const userLoginValidate = (userLogin) => async dispatch => {
        console.log('user login validate');
        const loginResult = await authService.loginDb(userLogin);
        console.log('loginResult: ', loginResult);
        
        let user;        
        if(!loginResult.error){
            user = loginResult.user.data;
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            appRoute("/racebet");           
        }
        else{
            dispatch({ type: 'LOGIN_FAILURE', payload: loginResult.error })
        }                 
}
    export const userRegister = (user) => async dispatch => {
        const registerResult = await authService.registerDb(user);
        console.log('register result: ', registerResult);
        if(!registerResult.data.error){
            dispatch({ type: 'REGISTER_SUCCESS', payload: registerResult.data.user });
            appRoute("/login");
        }
        else{
            dispatch({ type: 'REGISTER_FAILURE', payload: registerResult.data.error });
        }
    }

 function appRoute(route){
    history.push(route);
}
