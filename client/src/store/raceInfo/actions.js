import raceInfoService from '../../services/raceinfo.service'

export const getRaceInfo = () => async dispatch => {
    const stageId = 'Stage 18';
    const raceInfoResult = await raceInfoService.getRaceInfo(stageId);

    if (!raceInfoResult.data.error) {
        dispatch({
            type: 'RACE_INFO_SUCCESS',
            payload: {
                raceInfo: raceInfoResult.data.raceInfo,
                teams: teamRiders(raceInfoResult.data.competitors)
            }
        });
    }
    else {
        dispatch({ type: 'RACE_INFO_FAILURE', payload: raceInfoResult.data.error });
    }
}

function teamRiders(competitors) {
    let teamsMap = new Map();
    competitors.map(c => {
        const team = c.team;
        const rider = {
            name: reverseName(c.name),
            nationality: c.nationality
        };
        if (!teamsMap.has(team)) {
            const riders = [];
            riders.push(rider);
            teamsMap.set(team, riders);
        }
        else {
            let riders = teamsMap.get(team);
            riders.push(rider);
            teamsMap.set(team, riders);
        }
    });

    return teamsMap;
};

function reverseName(apiName) {
    try {
        return apiName.split(',').reverse().join(' ');
    }
    catch (err) {
        console.log(err.text);
        return apiName;
    }
};