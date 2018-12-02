import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import * as raceInfoAction from '../../store/raceInfo/actions';
import * as RaceInfoComponent from './RaceInfo';

class RaceBetMain extends React.Component {
    componentDidMount(){
        console.log('race info mount');
        this.props.dispatch(raceInfoAction.getActiveRace());
    }

    render() {
        if (!this.props.raceInfo){
            return (<div>Fetching racre info...</div>);
        }
        return (
            <Grid>
                <Grid.Column width={3}>
                <RaceInfoComponent raceInfo={this.props.raceInfo}/>
                </Grid.Column>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    const user = state.userAuth.user;
    const raceInfo = state.race.raceInfo;
    const riders = state.race.riders;
    (raceInfo) ? 
    console.log('raceInfo distance: ', raceInfo.distance) : console.log('no race info');
    
    return {
        raceInfo,
        user,
        riders
    };
}

export default connect(mapStateToProps)(RaceBetMain);