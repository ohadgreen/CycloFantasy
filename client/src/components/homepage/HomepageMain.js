import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import * as homepageActions from '../../store/homepage/actions';
import { TotalScoreChart } from './TotalScoreChart';
import { PrevRaceResults } from './PrevRaceResults';

class HomepageMain extends Component {
    state = {
        totalScores: [],
        nextRaceBets: {},
        prevRaceResults: {}
    }

    async componentDidMount(){
        const totalScores = await homepageActions.getTotalScores();
        const prevRaceResults = await homepageActions.getPrevRaceResults();
        // const nextRaceBets = await homepageActions.getNextRaceBets();

        this.setState({
            totalScores, 
            prevRaceResults
            // nextRaceBets, 
        });
    }

    render() {
        if (this.state.prevRaceResults === {}){
            return (<div>Fetching info...</div>);
        }
        else {
        return (
            <Grid celled> 
                <Grid.Row>
                    <TotalScoreChart totalScores={this.state.totalScores} />
                </Grid.Row>
                <Grid.Row>
                    <PrevRaceResults prevRaceResults={this.state.prevRaceResults}/>
                </Grid.Row>
            </Grid>
        )}
    }
}

function mapStateToProps(state) {
    const user = state.userAuth.user;
    return {
        user,
    };
}

export default connect(mapStateToProps)(HomepageMain);