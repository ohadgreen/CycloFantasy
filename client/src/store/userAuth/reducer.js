import _ from 'lodash';

const initialState = {
    loggedIn: false,
    user: undefined,
    loginResult: '',
    userList: []
}

export default function reduce(state = initialState, action) {     
    switch (action.type) {
        
        case 'LOGIN_SUCCESS': {
            console.log(...action.payload);
            return {loggedIn: true,
                    user: action.payload.user,
                    loginResult: action.payload.result,
            }
        }
        case 'LOGIN_FAILURE':
            return {                
                loginResult: action.payload.result,
            }
        default:
            return state;
    }
}