import React from "react";
import { Table, Header, Icon } from "semantic-ui-react";

export const PrevRaceResults = props => {
  if (!props.prevRaceResults.raceInfo) {
    console.log("prr no props!");
    return <div>prev race no data</div>;
  } else {
      const { raceName, stage, date } = props.prevRaceResults.raceInfo;
      const raceDate = new Date(Date.parse(date));
      const raceDateDisplay = raceDate.getDate() + "-" + (raceDate.getMonth() + 1) + "-" + raceDate.getFullYear();
      const raceResults = props.prevRaceResults.raceResults;
      const playerScores = props.prevRaceResults.userScores;

      const header = (
        <Header as='h3' icon textAlign='center'>
        <Icon name='trophy' size='mini'/>
        Last Race Results
        <Header.Subheader>{raceName}, {stage}, {raceDateDisplay}</Header.Subheader>
      </Header>
      )

  const tableHeader = (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>1st</Table.HeaderCell>
        <Table.HeaderCell>2nd</Table.HeaderCell>
        <Table.HeaderCell>3rd</Table.HeaderCell>
        <Table.HeaderCell>Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );

  const raceResultsRow = (
    <Table.Row>
      <Table.Cell>Race Results</Table.Cell>
      <Table.Cell>{raceResults[0]}</Table.Cell>
      <Table.Cell>{raceResults[1]}</Table.Cell>
      <Table.Cell>{raceResults[2]}</Table.Cell>
      <Table.Cell />
    </Table.Row>
  );

  const table = (
    <Table definition celled compact >
      {tableHeader}
      <Table.Body>
        {raceResultsRow}
        {playerScores.map((p, i) => {
          return playerBetResultRow(p);
        })}
      </Table.Body>
    </Table>
  );
  return (
    <div style={{"marginTop": "20px"}}>
      {header}
      {table}
    </div>
  ); 
  }
};

export const playerBetResultRow = playerBet => {
  return (
    <Table.Row key={playerBet.userNickname}>
      <Table.Cell>{playerBet.userNickname}</Table.Cell>
      <Table.Cell style={{ background: scoreCellBackground(playerBet.ridersChoice[0].score) }}>{playerBet.ridersChoice[0].rider}</Table.Cell>
      <Table.Cell style={{ background: scoreCellBackground(playerBet.ridersChoice[1].score) }}>{playerBet.ridersChoice[1].rider}</Table.Cell>
      <Table.Cell style={{ background: scoreCellBackground(playerBet.ridersChoice[2].score) }}>{playerBet.ridersChoice[2].rider}</Table.Cell>
      <Table.Cell>{playerBet.score}</Table.Cell>
    </Table.Row>
  );
};

export const scoreCellBackground = score => {
    switch (score){
        case 10 : return "#eda842";
        case 20 : return "#52fc23";
        default: return null;
    }

}
