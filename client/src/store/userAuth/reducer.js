let rawStoredUser = localStorage.getItem('user');
let storedUser = (rawStoredUser.length !== 0) ? JSON.parse(rawStoredUser) : '';
console.log(rawStoredUser + ' - ' + storedUser);
// let storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
    loggedIn: false,
    user: (storedUser) ? storedUser : undefined,
    loginResult: '',
}

export default function reduce(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {        
        case 'LOGIN_SUCCESS': {
            return {loggedIn: true,
                    user: action.payload,
                    loginResult: 'success',
            }
        }
        case 'LOGIN_FAILURE':
            return {                
                loginResult: action.payload,
            }
        
        case 'REGISTER_SUCCESS': {
            return {
                loggedIn: true,
                user: action.payload,
                loginResult: 'register success',
            }
        }
        case 'REGISTER_FAILURE':
            return {
                loginResult: action.payload,
            }

        default:
            return state;
    }    
}

// selectors
export function getUser(state) {
    return state.userAuth.user;
}