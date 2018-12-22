import homepageInfoService from '../../services/homepage.service';

export const getTotalScores = () => {
    const totalScores = await homepageInfoService.getTotalScores();
    if (totalScores) {
        return totalScores;
    }
    else {
        console.log('total scores fetch failure');
    }
}

export const getPrevRaceResults = () => {
    const prevRaceResults = await homepageInfoService.getPrevRaceResults();
    if (prevRaceResults) {
        return prevRaceResults;
    }
    else {
        console.log('prevRaceResults fetch failure');
    }
}

export const getNextRaceBets = () => {
    const nextRaceBets = await homepageInfoService.getNextRaceBets();
    if (nextRaceBets) {
        return nextRaceBets;
    }
    else {
        console.log('nextRaceBets fetch failure');
    }
}