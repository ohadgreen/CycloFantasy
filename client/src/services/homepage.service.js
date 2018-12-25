// import axios from 'axios';
import { prevRaceResultSample, nextRaceBetsSample, userTotalScoreChart } from '../resources/sampleData/HomePageInfo';

class HomepageInfo {

    getPrevRaceResults() {
        return prevRaceResultSample;
    }
    getNextRaceBets() {
        return nextRaceBetsSample;
    }
    getTotalScores() {
        return userTotalScoreChart;
    }
}

export default new HomepageInfo();