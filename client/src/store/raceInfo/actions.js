import raceInfoService from '../../services/raceinfo.service'

export const getRaceInfo = () => async dispatch => {
    const stageId = '342751';
    const raceInfoResult = await raceInfoService.getRaceInfo(stageId);

    console.log('race info action: ', raceInfoResult);
    if (!raceInfoResult.data.error) {
        const raceInfoData = raceInfoResult.data;
        console.log('raceInfoData: ', raceInfoData);
        
        const raceInfo = {
            raceName: raceInfoData.stage.race.name,
            stageNum: raceInfoData.stage.name,
            distance: raceInfoData.stage.course.distance,
            departureCity: raceInfoData.stage.course.departure_city,
            arrivalCity: raceInfoData.stage.course.arrival_city,
            classification: raceInfoData.stage.course.classification,
        }
        console.log('raceInfo: ', raceInfo);
        
        dispatch({ type: 'RACE_INFO_SUCCESS', payload: raceInfo });
    }
    else {        
        dispatch({ type: 'RACE_INFO_FAILURE', payload: raceInfoResult.data.error });
    }
}