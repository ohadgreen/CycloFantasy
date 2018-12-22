import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import * as homepageActions from '../../store/homepage/actions';
import { TotalScoreChart } from './TotalScoreChart';

class HomepageMain extends Component {
    state = {
        totalScores: [],
        nextRaceBets: {},
        prevRaceResults: {}
    }

    async componentDidMount(){
        const totalScores = await homepageActions.getTotalScores();
        const nextRaceBets = homepageActions.getNextRaceBets();
        const prevRaceResults = homepageActions.getPrevRaceResults();

        this.setState({
            totalScores, nextRaceBets, prevRaceResults
        });
    }

    render() {
        if (!this.state.totalScores){
            return (<div>Fetching info...</div>);
        }
        console.log('total scores: ' + this.state.totalScores);
        return (
            <Grid celled> 
                <Grid.Row>
                    <TotalScoreChart totalScores={this.state.totalScores} />
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    const user = state.userAuth.user;
    return {
        user,
    };
}

export default connect(mapStateToProps)(HomepageMain);