import React from 'react';
import './Rider.css';
// import InfoPopup from './InfoPopup';
import { Eject, Info } from '@material-ui/icons'

export const Rider = (props) => {
    return (
        <div className="box">
            <b style={{
                position: "absolute",
                top: "3px",
                textAlign: "left",
                width: "120px"
            }}>{props.name}</b>

            <Info
                fontSize="small"
                style={{ color: "green", position: "absolute", bottom: "0px", left: "10px", iconHoverColor: '#55ff55' }}
                onClick={() => console.log(props.name + ' info')}
            />
            <Eject
                fontSize="small"
                style={{ position: "absolute", bottom: "0px", right: "10px" }}
                onClick={() => props.onClick(props)}
            />
        </div>
    )
}