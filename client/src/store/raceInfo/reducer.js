
const initialState = {
    fetched: false,
    raceInfo: undefined,
    competitors: [],
}

export default function reduce(state = initialState, action) {
    console.log('reducer action.type ', action.type);
    switch (action.type) {
        case 'RACE_INFO_SUCCESS': {
            // console.log(action.payload);
            return {
                fetched: true,
                raceInfo: action.payload.raceInfo,
                competitors: [],
            }
        }      

        default:
            return state;
    }
}