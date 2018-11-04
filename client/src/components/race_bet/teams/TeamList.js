import React from 'react';
import Team from './Team';
import './Teams.css';

class TeamList extends React.Component {
    renderTeam(team) {
        return (
            <Team
                key={team.name}
                name={team.name}
                img={team.img}
                riders={team.riders}
                onClick={this.props.onClick.bind(this)}
            />
        )
    }

    teamList(teamRiders) {
        return teamRiders.map(t => this.renderTeam(t));
    }

    render() {
        if (!this.props.teamRiders) {
            return (<div>Loading</div>)
        }

        return (
            <div>
                <div className="riders-select">
                    {this.teamList(this.props.teamRiders)}
                </div>
            </div>
        )
    }
}

export default TeamList;