import React from "react";
import { Rider } from "../riders/Rider";
import "./PlayerChoice.css";

class PlayerChoice extends React.Component {
    chosenRiderList(chosenRiders) {

        let isFirstChoice = false;
        return chosenRiders.map((rider, i) => {
            const currentchoiceParams = choiceParams[i];
            let message;
            if (rider === "tbd") {
                if (!isFirstChoice) {
                    message = "please choose";
                    isFirstChoice = true;
            }
        }
      return (
            <div className="choice" key={i}>
              <div style={ choice_header }>{currentchoiceParams.header}</div>
                <div>
                    {rider === "tbd" ? (
                      <div style={messageStyle}>{message}</div>
                    ) : (
                            <Rider
                                key={i}
                                name={rider.name}
                                nationality={rider.nationality}
                                id={rider.id}
                                onClick={this.props.onClick.bind(this)}
                            />
                        )}
                </div>
            </div>
        );
    });
}

render() {
    return (
        <div className="race-bet">
            <div className="choice-title">Your Riders Choice:</div>
        {this.chosenRiderList(this.props.chosenRiders)}
        </div>
    );
}
}

export default PlayerChoice;

const choice_header = {
    marginTop: '3px',
    fontWeight: 'bold',
    textAlign : 'center', }

const messageStyle = {
    fontWeight: '400',
    marginTop: '15px',
    textAlign: 'center',
}

const choiceParams = [
    {
        rank: 1,
        header: "winner"
    },
    {
        rank: 2,
        header: "2nd place"
    },
    {
        rank: 3,
        header: "3rd place"
    }
];
