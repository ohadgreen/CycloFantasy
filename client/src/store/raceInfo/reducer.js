import Immutable from 'seamless-immutable';

const initialState = {
    fetched: false,
    raceInfo: {},
    riders: [],
    bets: [],
    currentUserBet: []
};

export default function reduce(state = initialState, action) {
    console.log('reducer action.type ', action.type);
    switch (action.type) {
        case 'RACE_INFO_SUCCESS': {
            return {
                fetched: true,
                raceInfo: action.payload.raceInfo,
                riders: action.payload.riders,
                bets: action.payload.bets,
                currentUserBet: action.payload.currentUserBet, }
            
        }
        case 'USER_BET_UPDATE': {
            let testBet = new Array(3).fill({ normName: 'test' });
            return {
                ...state,
                currentUserBet: action.payload
            }
        } 
        default:
            return state;
    }
}

// selectors
export function getCurrentUserBet(state) {
    return state.race.currentUserBet;
}