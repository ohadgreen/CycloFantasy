import React from 'react';
import { connect } from 'react-redux';
import { teamRidersSample } from '../../resources/sampleData/teamRiders';
import { raceInfoSample } from '../../resources/sampleData/raceInfo';
import { RaceInfo } from '../raceInfo/RaceInfo';
import PlayerChoice from './player_choice/PlayerChoice';
import TeamList from './teams/TeamList';

class RaceBet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            raceInfo: raceInfoSample,
            teamRiders: teamRidersSample,
            chosenRiders: ['tbd', 'tbd', 'tbd'],
            choiceCount: 0
        };
    }

    updateChosenTrueOrFalse(chosenRider, toAdd) {
        let teamRidersUpdate = this.state.teamRiders;
        teamRidersUpdate.forEach(team => {
            team.riders.forEach(rider => {
                if (rider.id === chosenRider.id) {
                    rider.chosen = toAdd;
                }
            })
        });
        return teamRidersUpdate;
    }

    addRider = (rider) => { this.addOrRemoveRiderToBetList(rider, 'add') }
    removeRider = (rider) => { this.addOrRemoveRiderToBetList(rider, 'remove') }

    addOrRemoveRiderToBetList(clickedRider, addRemove) {
        let chosenRidersUpdate = this.state.chosenRiders;
        let choiceCountUpdate = this.state.choiceCount;
        let teamRidersNew;

        // console.log(`rider ${clickedRider.name} to ${addRemove}, choice count ${choiceCountUpdate}`);
        const toAdd = (addRemove === 'add');

        if (toAdd) {
            if (choiceCountUpdate < 3) {
                teamRidersNew = this.updateChosenTrueOrFalse(clickedRider, toAdd);
                for (let i = 0; i <= 3; i++) {
                    if (chosenRidersUpdate[i] === 'tbd') {
                        chosenRidersUpdate[i] = clickedRider;
                        break;
                    }
                }
                choiceCountUpdate++;
            }
            else {
                console.log('can choose only 3');
                teamRidersNew = this.state.teamRiders;
            }
        }
        else { // remove from chosen list
            teamRidersNew = this.updateChosenTrueOrFalse(clickedRider, toAdd);
            for (let i = 0; i <= 3; i++) {
                if (chosenRidersUpdate[i].name === clickedRider.name) {
                    chosenRidersUpdate[i] = 'tbd';
                    break;
                }
            }
            choiceCountUpdate--;
        }

        this.setState({
            teamRiders: teamRidersNew,
            chosenRiders: chosenRidersUpdate,
            choiceCount: choiceCountUpdate
        })
    }

    render() {
        return (
            <div>
                <div>Hello {this.props.user.nickname}</div>
                <RaceInfo raceInfo={this.state.raceInfo} />
                <PlayerChoice
                    chosenRiders={this.state.chosenRiders}
                    onClick={this.removeRider.bind(this)}
                />
                <TeamList
                    teamRiders={this.state.teamRiders}
                    onClick={this.addRider.bind(this)}
                />
            </div>)
    }
}

function mapStateToProps(state) {
    const user = state.userAuth.user;
    (user) ?
        console.log('bet mstp user: ', JSON.stringify(user)) : console.log('no user logged in');
    return {
        user
    };
}

export default connect(mapStateToProps)(RaceBet);