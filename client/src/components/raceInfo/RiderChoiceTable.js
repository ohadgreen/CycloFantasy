import React, { Component } from 'react';
import { connect } from 'react-redux';
import imageService from '../../services/images.service';
import * as raceInfoActions from '../../store/raceInfo/actions';
import { Table, Modal, Image, Button, Icon } from 'semantic-ui-react';

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
        const reqParams = { team: rider.team, normName: rider.normName };
        const image = await imageService.getRiderImage(reqParams);
        this.setState({ modalRider: rider, modalOpen: true, image: image })
    }

    handleChoice = (rider) => {
        this.props.dispatch(raceInfoActions.addChosenRiderBet(rider));
    }

    render() {
        const imgPlaceholderSrc = require('../../resources/images/riderImages/rider-placeholder.jpg');
        const imgDisplay = (this.state.image === '') ? imgPlaceholderSrc : `data:image/png;base64,${this.state.image}`;

        return (
            <div>
                <Modal size='mini' open={this.state.modalOpen}>
                    <Modal.Header>{this.state.modalRider.displayName}</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='small' src={imgDisplay} />
                        <Modal.Description>
                            <p><b>Nationality: </b>{this.state.modalRider.nationality}</p>
                            <p><b>Team: </b>{this.state.modalRider.team}</p>
                            <p><b>Age: </b>{this.state.modalRider.age}</p>
                            <p><b>Height: </b>{this.state.modalRider.height} m</p>
                            <p><b>Weight: </b>{this.state.modalRider.weight} Kg</p>
                            <p><b>Pro wins: </b>{this.state.modalRider.proWins}</p>
                            <p><b>Grand Tours: </b>{this.state.modalRider.grandTours}</p>
                            <p><a href={this.state.modalRider.pageUrl}>PCS page</a></p>
                        </Modal.Description>
                    </Modal.Content>
                    <Button onClick={() => this.setState({ modalOpen: false })}>Close</Button>
                </Modal>
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