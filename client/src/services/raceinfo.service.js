import axios from 'axios';

const BASE_URL = 'http://api.sportradar.us/cycling-t1/en/stages/sr:stage:@@@/summary.json'; 
const API_KEY = 'gddfnj6ve2g64u4hgfd99c5b';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

class RaceInfo {
    async getRaceInfo(raceId) {
        const raceInfoApiUrl = BASE_URL.replace('@@@', raceId) + '?api_key=' + API_KEY;
        console.log('raceUrl: ' + raceInfoApiUrl);
        
        const response = await axios({
            url: proxyurl + raceInfoApiUrl,
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
            console.log('race name: ', raceInfo.stage.race.name);            
            return { data: raceInfo }
        }
    }
}

export default new RaceInfo();