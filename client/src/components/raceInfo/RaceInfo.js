import React from 'react';
import './RaceInfo.css';

export const RaceInfo = (props) => {

    const { raceName, stage, date, distance, departureCity, arrivalCity, classification, profileImage } = props.raceInfo;
    const raceDate = new Date(date.$date);
    const raceDateDisplay = raceDate.getFullYear() + '-' + (raceDate.getMonth() + 1) + '-' + raceDate.getDate();

    return (
        <div className="race-info">
            <div className="race-details">
                next race: {raceDateDisplay} <br />
                <b>{raceName}, {stage}</b> <br />
                from {departureCity} to {arrivalCity}<br />
                distance: {distance} km, {classification}
            </div>
            <div style={{ align: "right" }}>
                <img
                    src={require(`../../resources/images/raceProfiles/${profileImage}`)}
                    alt={props.raceInfo.stage}
                    style={{ width: "250px", height: "120px" }}
                ></img>
            </div>
        </div>
    )
}