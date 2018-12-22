import React from 'react';
import { Card, Table } from 'semantic-ui-react';

export const PrevRaceResults = (props) => {
    const { raceName, stage, date } = props.raceInfo;
    const raceDate = new Date(Date.parse(date));
    const raceDateDisplay = raceDate.getDate() + '-' + (raceDate.getMonth() + 1) + '-' + raceDate.getFullYear();
    
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{raceName}, {stage}</Card.Header>
                <Card.Meta>{raceDateDisplay}</Card.Meta>
            </Card.Content>
        </Card>
    )
}