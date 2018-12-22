import React, { Component } from 'react';
import { connect } from 'react-redux';
import imageService from '../../services/images.service';
import * as raceInfoActions from '../../store/raceInfo/actions';
import { Table, Button} from 'semantic-ui-react';
import { RiderInfoModal}  from './RiderInfoModal';

class RiderChoiceTable extends Component {
    state = {
        modalRider: {},
        image: '',
        modalOpen: false,
    }

    renderRiderRow = () => {
        return this.props.riders.map((rider, i) => {
            return (
                <Table.Row key={i}>
                    <Table.Cell onClick={() => this.openRiderInfoModal(rider)}><a href='#'>{rider.displayName}</a></Table.Cell>
                    <Table.Cell>{rider.team}</Table.Cell>
                    <Table.Cell>{rider.proWins}</Table.Cell>
                    <Table.Cell>
                        {(rider.chosen || this.props.finalizedBet) ? null :
                            (<Button
                                onClick={() => this.handleChoice(rider)}
                                basic
                                size="mini"
                                color="green"
                            >choose</Button>)}</Table.Cell>
                </Table.Row>
            )
        })
    }

    openRiderInfoModal = async (rider) => {
        console.log(rider.displayName);
        const reqParams = { team: rider.team , normName: rider.normName};
        const image = await imageService.getRiderImage(reqParams);
        this.setState({ modalRider: rider, modalOpen: true, image: `data:image/png;base64,${image}` })
    }

    closeModal = () => { this.setState({ modalOpen: false }) };

    handleChoice = (rider) => {
        this.props.dispatch(raceInfoActions.addChosenRiderBet(rider));
    }

    render() {
        return (
            <div>
                <RiderInfoModal 
                modalOpen={this.state.modalOpen}
                modalRider={this.state.modalRider}
                imgDisplay={this.state.image}
                closeModal={this.closeModal}
                />
                <Table compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Team</Table.HeaderCell>
                            <Table.HeaderCell>Pro-Wins</Table.HeaderCell>
                            <Table.HeaderCell>Choose</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRiderRow()}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const finalizedBet = state.race.finalizedBet;
    const riders = state.race.riders;
    return {
        finalizedBet,
        riders
    };
}

export default connect(mapStateToProps)(RiderChoiceTable);