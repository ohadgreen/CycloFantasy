import raceInfoService from '../../services/raceinfo.service'

export const getRaceInfo = () => async dispatch => {
    const stageId = 'Stage 18';
    const raceInfoResult = await raceInfoService.getRaceInfo(stageId);

    console.log('race info action: ', raceInfoResult);
    if (!raceInfoResult.data.error) {
        const raceInfoData = raceInfoResult.data;
        console.log('raceInfoData: ', raceInfoData);
        
        dispatch({ type: 'RACE_INFO_SUCCESS', payload: { raceInfo: raceInfoResult.data.raceInfo}});
    }
    else {        
        dispatch({ type: 'RACE_INFO_FAILURE', payload: raceInfoResult.data.error });
    }
}

function teamRiders(competitors) {
    let teams = [];
    let teamsMap = new Map();
    competitors.map(c => {
        
    })
}