import React from "react";
import { connect } from 'react-redux';
import * as raceSelectors from '../../store/raceInfo/reducer';
import * as userSelector from '../../store/userAuth/reducer';
import { addChosenRiderBet } from '../../store/raceInfo/actions';
import { addUserBet } from '../../store/raceInfo/bets';
import { Button } from 'semantic-ui-react';

class PlayerTopChoice extends React.Component {

    submitBet = () => {
        console.log('submit bet');
        addUserBet();
        this.props.dispatch(addUserBet());
    }

    render() {
        console.log('choice render: ' + this.props.userBet[0].normName);
        let chosenRiders = this.props.userBet.map(r => <li key={r._id}>{r.displayName}</li>)
        return (
            <div>Hey {this.props.user.nickname}, Choose your riders
            <ul>
                {chosenRiders}
            </ul>
            <div>{this.props.finalizedBet ? (<Button onClick={this.submitBet}>Submit</Button>) : null}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const currentUserBet = raceSelectors.getCurrentUserBet(state);
    const finalizedBet = raceSelectors.getIsFinalizeBet(state);
    const user = userSelector.getUser(state);
    return {
        user,
        userBet: currentUserBet,
        finalizedBet
    };
}

export default connect(mapStateToProps)(PlayerTopChoice);