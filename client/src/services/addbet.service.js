import axios from 'axios';
const DB_FETCH_URL = "/api/race/";

class AddBetService {
    async addBet(bet) {
        const response = await axios({
            url: `${DB_FETCH_URL}addbet`,
            params: bet,
            method: 'POST',
            headers: {
                Accept: 'application/json',
            }
        });

        if (!response.status === 200) {
            console.log('response:' + response);
            return { error: response.statusText }
        }
        else {
            const raceInfo = response.data;
            console.log('race name: ', raceInfo.raceName);
            return { data: 'bet updated' }
        }
    }
}
export default new AddBetService();