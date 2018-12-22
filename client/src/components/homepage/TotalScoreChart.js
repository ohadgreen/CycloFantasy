import React from "react";
import { Table } from "semantic-ui-react";

export const TotalScoreChart = props => {
  const totalScores = props.totalScores;

  const tableBody = totalScores.map((user, i) => {
    return (
      <Table.Row key={i}>
        <Table.Cell>{user.userNickname}</Table.Cell>
        <Table.Cell>{user.score}</Table.Cell>
      </Table.Row>
    );
  });

  return (
    <Table compact celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Nick</Table.HeaderCell>
          <Table.HeaderCell>Score</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{tableBody}</Table.Body>
    </Table>
  );
};
