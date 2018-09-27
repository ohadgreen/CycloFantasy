import React from 'react';
import { connect } from 'react-redux';
import * as raceInfoAction from '../../store/raceInfo/actions'

class RaceInfo extends React.Component {

    componentDidMount(){
        console.log('race info mount');
        
        this.props.dispatch(raceInfoAction.getRaceInfo());
    }

    render() {
        if (!this.props.raceInfo){
            return (<div>Fetching racre info...</div>);
        }
        return (
            <div>stage distance {this.props.raceInfo.distance}</div>
        )
    }
}

function mapStateToProps(state) {
    const raceInfo = state.raceInfo.raceInfo;
    (raceInfo) ? 
    console.log('raceInfo distance: ', raceInfo.distance) : console.log('no race info');
    
    return {
        raceInfo
    };
}

export default connect(mapStateToProps)(RaceInfo);