// import Immutable from 'seamless-immutable';

const initialState = {
    fetched: false,
    raceid: '',
    raceInfo: {},
    riders: [],
    bets: [],
    currentUserBet: [],
    finalizedBet: false,
};

export default function reduce(state = initialState, action) {
    console.log('reducer action.type ', action.type);
    switch (action.type) {
        case 'RACE_INFO_SUCCESS': {
            return {
                fetched: true,
                raceid: action.payload.raceid,
                raceInfo: action.payload.raceInfo,
                riders: action.payload.riders,
                bets: action.payload.bets,
                currentUserBet: action.payload.currentUserBet,
                finalizedBet: false
                }
        }
        case 'USER_BET_UPDATE': {
            return {
                ...state,
                currentUserBet: action.payload.newUserBet,
                riders: state.riders.map(rider => {
                    if(rider._id === action.payload.rider._id){
                        return {...rider, chosen: true}
                    };
                    return rider;
                }),
                finalizedBet: (action.payload.tbdCount === 0)
            }
        }
        case 'FINALIZE_BET': {
            return {
                ...state,
                finalizedBet: true
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

export function getIsFinalizeBet(state) {
    return state.race.finalizedBet;
}

export function getRaceid(state) {
    return state.race.raceid;
}