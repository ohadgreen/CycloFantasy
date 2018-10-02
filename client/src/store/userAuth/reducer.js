
let storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
    loggedIn: false,
    user: (storedUser) ? storedUser : undefined,
    loginResult: '',
}

export default function reduce(state = initialState, action) {     
    // console.log('storedUser ', storedUser);
    switch (action.type) {        
        case 'LOGIN_SUCCESS': {
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