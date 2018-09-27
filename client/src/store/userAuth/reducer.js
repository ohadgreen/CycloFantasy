
let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    loggedIn: false,
    user: undefined,
    loginResult: '',
}

export default function reduce(state = initialState, action) {     
    // console.log('reducer action.type ', action.type);
    switch (action.type) {        
        case 'LOGIN_SUCCESS': {
            // console.log(action.payload);
            return {loggedIn: true,
                    user: action.payload,
                    loginResult: 'success',
            }
        }
        case 'LOGIN_FAILURE':
            console.log(action.payload);
            return {                
                loginResult: action.payload,
            }
        
        case 'REGISTER_SUCCESS': {
            // console.log(action.payload);
            return {
                loggedIn: true,
                user: action.payload,
                loginResult: 'register success',
            }
        }
        case 'REGISTER_FAILURE':
            console.log(action.payload);
            return {
                loginResult: action.payload,
            }

        default:
            return state;
    }    
}