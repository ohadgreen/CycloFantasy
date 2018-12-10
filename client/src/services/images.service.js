import axios from 'axios';
import { raceInfoSample } from '../resources/sampleData/raceInfo';
const SERVER_IMAGE_PATH = "/api/image/";

class ImageService {
    async getRiderImage(riderParams) {
        const response = await axios({
            url: `${SERVER_IMAGE_PATH}rider`,
            params: riderParams,
            method: 'GET',
            responseType: 'arraybuffer',
            
        });
        // console.log('image service: ' + JSON.stringify(response));
        return new Buffer(response.data, 'binary').toString('base64');
    }
}

export default new ImageService();