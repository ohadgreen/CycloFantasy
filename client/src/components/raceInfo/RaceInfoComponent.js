import React from 'react';
import { Card, Image } from 'semantic-ui-react';
// import './RaceInfo.css';

export const RaceInfoComponent = (props) => {
    const { raceName, stage, date, distance, departureCity, arrivalCity, classification, profileImage } = props.raceInfo;
    const raceDate = new Date(Date.parse(date));
    const raceDateDisplay = raceDate.getDate() + '-' + (raceDate.getMonth() + 1) + '-' + raceDate.getFullYear();
    const cardDescription = `from ${departureCity} to ${arrivalCity}, ${distance} km, ${classification}`;

    return (
        <Card fluid>
            <Image
                src={require(`../../resources/images/raceProfiles/vuelta2018_stg18_profile.jpeg`)}
                wrapped
            ></Image>
            <Card.Content>
                {/* image={require(`../../resources/images/raceProfiles/vuelta2018_stg18_profile.jpeg`)} */}
                <Card.Header>{raceName}</Card.Header>
                <Card.Meta>{stage}, {raceDateDisplay}</Card.Meta>
                <Card.Description>{cardDescription}</Card.Description>
            </Card.Content>
        </Card>
    )
}