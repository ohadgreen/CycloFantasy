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
        // <div style={boxStyle} /* className="race-info" */>
        //     <div style={raceDetails} /* className="race-details" */>
        //         next race: {raceDateDisplay} <br />
        //         {raceName}, {stage} <br />
        //         from {departureCity} to {arrivalCity}<br />
        //         distance: {distance} km, {classification}
        //     </div>

        //     <img style={profileImageStyle}/* className="race-profile-img" */
        //         src={require(`../../resources/images/raceProfiles/vuelta2018_stg18_profile.jpeg`)}
        //         alt={props.raceInfo.stage}
        //     ></img>
        // </div>
    )
}

const boxStyle = {
    position: "absolute",
    border: "1px solid #999",
    borderRadius: "4px",
    padding: "10px",
    height: "25%",
    width: "45%",
}
const raceDetails = {
    position: "relative",
    alignSelf: "left",
}
const profileImageStyle = {
    position: "relative",
    alignSelf: "right",
    height: "80%",
    width: "40%",
}