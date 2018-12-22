export const prevRaceResultSample = {
    raceInfo: {
        raceName: "Tour de France",
        stage: "Stage 1",
        date: "2018-07-07T00:00:00.000Z",
    },
    raceResults: ["Oliver Naesen", "Peter Sagan", "Romain Bardet"],
    userScores: [{
        userNickname: "ogreen",
        ridersChoice: ["Peter Sagan", "Alejandro Valverde", "Lars Boom"],
        score: 10
    },
    {
        userNickname: "froomie",
        ridersChoice: ["Chris Froome", "Peter Sagan", "Daniel Oss"],
        score: 20
    },
    {
        userNickname: "diesel",
        ridersChoice: ["Dan Martin", "Alejandro Valverde", "Romain Bardet"],
        score: 30
    },
]
};

export const nextRaceBetsSample = {
    raceInfo: {
        raceName: "Tour de France",
        stage: "Stage 2",
        date: "2018-07-08T00:00:00.000Z",
    },
    userBet: [{
        userNickname: "ogreen",
        ridersChoice: ["Peter Sagan", "Alejandro Valverde", "Lars Boom"],
    },
    {
        userNickname: "froomie",
        ridersChoice: ["Chris Froome", "Peter Sagan", "Daniel Oss"],
    },
    {
        userNickname: "diesel",
        ridersChoice: ["Dan Martin", "Alejandro Valverde", "Romain Bardet"],
    },
]
};

export const userTotalScoreChart = 
    [
        {userNickname: "ogreen", score: 100},
        {userNickname: "froomie", score: 80},
        {userNickname: "diesel", score: 50},
    ]
