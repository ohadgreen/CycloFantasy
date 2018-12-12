import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import * as raceInfoAction from '../../store/raceInfo/actions';
import { RaceInfoComponent } from './RaceInfoComponent';
import PlayerTopChoice from './PlayerTopRiderChoice';
import RiderChoiceTable from './RiderChoiceTable';

class RaceBetMain extends Component {
    componentDidMount(){
        this.props.dispatch(raceInfoAction.getActiveRace());
    }

    render() {
        if (!this.props.dataFetched){
            return (<div>Fetching race info...</div>);
        }
        return (
            <Grid celled>
                <Grid.Row style={{ height: '30%' }}>
                    <PlayerTopChoice />
                </Grid.Row>
                {/* <Grid.Row style={{ height: '20%' }}>
                    <RaceInfoComponent raceInfo={this.props.raceInfo} />
                </Grid.Row> */}
                <Grid.Row style={{ height: '50%' }}>
                    <RiderChoiceTable />
                </Grid.Row>
                
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    const dataFetched = state.race.fetched;
    const user = state.userAuth.user;
    const raceInfo = state.race.raceInfo;
    // (dataFetched) ? console.log('raceInfo distance: ', raceInfo.distance) : console.log('no race info');
    
    return {
        dataFetched,
        raceInfo,
        user,
    };
}

export default connect(mapStateToProps)(RaceBetMain);