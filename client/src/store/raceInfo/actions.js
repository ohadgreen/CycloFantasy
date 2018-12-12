import _ from 'lodash';
import raceInfoService from '../../services/raceinfo.service';
import * as raceSelectors from './reducer';

export const getActiveRace = () => async dispatch => {
    const raceInfoResult = await raceInfoService.getRaceActive();
    if (!raceInfoResult.data.error) {

        currentUserBetInit(raceInfoResult.data.bets);
        dispatch({
            type: 'RACE_INFO_SUCCESS',
            payload: {
                raceInfo: raceInfoResult.data.raceInfo,
                riders: orderRiders(raceInfoResult.data.riders),
                bets: raceInfoResult.data.bets,
                currentUserBet: currentUserBetInit(raceInfoResult.data.bets),
            }
        });
    }
    else {
        console.log('data fetch failure ' + JSON.stringify(raceInfoResult));
        dispatch({ type: 'RACE_INFO_FAILURE', payload: raceInfoResult.data.error });
    }
}

export const addChosenRiderBet = (rider) => {
   return (dispatch, getState) => {
        const currentUserBet = raceSelectors.getCurrentUserBet(getState());
        let newUserBet = [...currentUserBet];
        for (let i = 0; i <= 3; i++) {
            if (newUserBet[i].normName === 'tbd') {
                newUserBet[i] = rider;
                break;
            }
        }
       console.log('chosen rider update: ' + newUserBet.map(r => r.normName));
       dispatch({ type: 'USER_BET_UPDATE', payload: newUserBet });
   }
}

function currentUserBetInit(raceBets) { // returns the current user bet, if exists, or an array of ('tbd', 'tbd', 'tbd')
    let storedUser = JSON.parse(localStorage.getItem('user'));
    const currentUserBet = raceBets.filter(bet => bet.user._id === storedUser.id); //TODO: test
    if(currentUserBet.length === 0){
    let initEmptyBet = [];
        for(let i = 0; i < 3; i++){
            initEmptyBet.push({ _id: i, normName: 'tbd' });
        }
        return initEmptyBet;
    }
    else {
        return currentUserBet[0].ridersChoice;
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
    return ridersOrderByWins;
}
