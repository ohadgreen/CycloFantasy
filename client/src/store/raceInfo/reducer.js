const initialState = {
    fetched: false,
    raceInfo: {},
    riders: [],
    bets: [],
    currentUserBet: []
}

export default function reduce(state = initialState, action) {
    console.log('reducer action.type ', action.type);
    switch (action.type) {
        case 'RACE_INFO_SUCCESS': {
            return {
                fetched: true,
                raceInfo: action.payload.raceInfo,
                riders: action.payload.riders,
                bets: action.payload.bets
            }
        }      
        default:
            return state;
    }
}