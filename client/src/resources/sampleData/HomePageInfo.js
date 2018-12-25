export const prevRaceResultSample = {
  raceInfo: {
    raceName: "Tour de France",
    stage: "Stage 1",
    date: "2018-07-07T00:00:00.000Z"
  },
  raceResults: ["Oliver Naesen", "Peter Sagan", "Romain Bardet"],
  userScores: [
    {
      userNickname: "ogreen",
      ridersChoice: [
        { rider: "Peter Sagan", score: 10 },
        { rider: "Alejandro Valverde", score: 0 },
        { rider: "Lars Boom", score: 0 }
      ],
      score: 20
    },
    {
      userNickname: "froomie",
      ridersChoice: [
        { rider: "Chris Froome", score: 0 },
        { rider: "Peter Sagan", score: 20 },
        { rider: "Daniel Oss", score: 0 }
      ],
      score: 20
    },
    {
      userNickname: "diesel",
      ridersChoice: [
        { rider: "Dan Martin", score: 0 },
        { rider: "Romain Bardet", score: 10 },
        { rider: "Tom Dumolin", score: 0 }
      ],
      score: 10
    }
  ]
};

export const nextRaceBetsSample = {
  raceInfo: {
    raceName: "Tour de France",
    stage: "Stage 2",
    date: "2018-07-08T00:00:00.000Z"
  },
  userBet: [
    {
      userNickname: "ogreen",
      ridersChoice: ["Peter Sagan", "Alejandro Valverde", "Lars Boom"]
    },
    {
      userNickname: "froomie",
      ridersChoice: ["Chris Froome", "Peter Sagan", "Daniel Oss"]
    },
    {
      userNickname: "diesel",
      ridersChoice: ["Dan Martin", "Alejandro Valverde", "Romain Bardet"]
    }
  ]
};

export const userTotalScoreChart = [
  { userNickname: "ogreen", score: 100 },
  { userNickname: "froomie", score: 80 },
  { userNickname: "diesel", score: 50 }
];
