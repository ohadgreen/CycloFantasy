
const initialState = {
    fetched: false,
    raceInfo: undefined,
    teams: new Map(),
}

export default function reduce(state = initialState, action) {
    console.log('reducer action.type ', action.type);
    switch (action.type) {
        case 'RACE_INFO_SUCCESS': {
            console.log(action.payload.teams);
            return {
                fetched: true,
                raceInfo: action.payload.raceInfo,
                teams: action.payload.teams,
            }
        }      

        default:
            return state;
    }
}