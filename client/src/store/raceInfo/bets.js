import addbetService from '../../services/addbet.service';
import * as raceSelectors from './reducer';
import * as userSelectors from '../userAuth/reducer';

export const addUserBet = () => async (dispatch, getState) => {
    const state = getState();
    const ridersChoice = raceSelectors.getCurrentUserBet(state);
    const raceid = raceSelectors.getRaceid(state);
    let ridersChoiceForDb = [];
    ridersChoice.map((r, i) => {
        const choice = { rider: r._id, rank: i + 1 };
        ridersChoiceForDb.push(choice);
    });
    const newBet = {
        raceid: raceid,
        user: userSelectors.getUser(state).id,
        ridersChoice: ridersChoiceForDb
    }
    console.log('bet action: ' + JSON.stringify(newBet));
    const addBetResult = await addbetService.addBet(newBet);
    return addBetResult;

}