import axios from 'axios';
// const BASE_URL = 'http://api.sportradar.us/cycling-t1/en/stages/sr:stage:@@@/summary.json'; 
// const API_KEY = 'gddfnj6ve2g64u4hgfd99c5b';
// const proxyurl = "https://cors-anywhere.herokuapp.com/";
const DB_FETCH_URL = "/api/race/";

class RaceInfo {
    async getRaceActive() {
        // const raceInfoApiUrl = BASE_URL.replace('@@@', raceId) + '?api_key=' + API_KEY;
        const response = await axios({
            // url: proxyurl + raceInfoApiUrl,
            url: `${DB_FETCH_URL}active`,
            // params: raceDate,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });

        if (!response.status === 200) {
            console.log('response:' + response);
            return { error: response.statusText }
        }
        else {
            const raceInfo = response.data;
            console.log('race name: ', raceInfo.raceName);
            return { data: raceInfo }
        }
    }

    async getRaceByDate(year, month, day) {
        // const raceInfoApiUrl = BASE_URL.replace('@@@', raceId) + '?api_key=' + API_KEY;
        const raceDate = { year: year, month: month, day: day };
        const response = await axios({
            // url: proxyurl + raceInfoApiUrl,
            url: `${DB_FETCH_URL}bydate`,
            params: raceDate,
            method: 'GET',            
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });

        if (!response.status === 200) {
            console.log('response:' + response);
            return { error: response.statusText }
        }
        else {
            const raceInfo = response.data;
            console.log('race name: ', raceInfo.raceName);            
            return { data: raceInfo }
        }
    }
}

export default new RaceInfo();