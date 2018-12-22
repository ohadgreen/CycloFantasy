import homepageInfoService from '../../services/homepage.service';

export const getTotalScores = async () => {
    const totalScores = await homepageInfoService.getTotalScores();
    if (totalScores) {
        return totalScores;
    }
    else {
        console.log('total scores fetch failure');
    }
}

export const getPrevRaceResults = async () => {
    const prevRaceResults = await homepageInfoService.getPrevRaceResults();
    if (prevRaceResults) {
        return prevRaceResults;
    }
    else {
        console.log('prevRaceResults fetch failure');
    }
}

export const getNextRaceBets = async () => {
    const nextRaceBets = await homepageInfoService.getNextRaceBets();
    if (nextRaceBets) {
        return nextRaceBets;
    }
    else {
        console.log('nextRaceBets fetch failure');
    }
}