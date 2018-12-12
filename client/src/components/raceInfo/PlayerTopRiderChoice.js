import React from "react";
import { connect } from 'react-redux';
import * as raceSelectors from '../../store/raceInfo/reducer';
import { addChosenRiderBet } from '../../store/raceInfo/actions';

class PlayerTopChoice extends React.Component {

    render() {
        console.log('choice render: ' + this.props.userBet[0].normName);
        let chosenRiders = this.props.userBet.map(r => <li key={r._id}>{r.displayName}</li>)
        return (
            <div>Your Race Choice
            <ul>
                    {chosenRiders}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const currentUserBet = raceSelectors.getCurrentUserBet(state);
    return {
        userBet: currentUserBet
    };
}

export default connect(mapStateToProps, { addChosenRiderBet })(PlayerTopChoice);