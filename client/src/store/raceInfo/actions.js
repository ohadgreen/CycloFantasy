import _ from 'lodash';
import raceInfoService from '../../services/raceinfo.service'

export const getActiveRace = () => async dispatch => {
    const raceInfoResult = await raceInfoService.getRaceActive();

    if (!raceInfoResult.data.error) {
        dispatch({
            type: 'RACE_INFO_SUCCESS',
            payload: {
                raceInfo: raceInfoResult.data.raceInfo,
                riders: orderRiders(raceInfoResult.data.riders),
                bets: raceInfoResult.data.bets,
                currentUserBet: [] //TODO: filter user bet if exists
            }
        });
    }
    else {
        dispatch({ type: 'RACE_INFO_FAILURE', payload: raceInfoResult.data.error });
    }
}

function orderRiders(ridersFromDb) {
    let ridersOrderByWins = _.orderBy(ridersFromDb, 'proWins', 'desc');
    let winsRank = 0;
    _.forEach(ridersOrderByWins, (rider) => {
        rider['winsRank'] = winsRank;
        if (winsRank < 50) {
            rider['top50'] = true;
        }
        winsRank++;
    });

    /* for (rider of ridersOrderByWins){
        rider['winsRank'] = winsRank;
        if(winsRank < 50) {
            rider['top50'] = true;
        }
        winsRank ++;
    } */
    return ridersOrderByWins;
}
