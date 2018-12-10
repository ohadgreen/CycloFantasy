import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Modal, Image, Button } from 'semantic-ui-react'

class RiderChoiceTable extends Component {
    state = {
        modalRider: {},
        modalOpen: false,
    }

    renderRiderRow = () => {
       return this.props.riders.map((rider, i) => {
            return (
                <Table.Row key={i}>
                    <Table.Cell onClick={() => this.handleClick(rider)}>{rider.displayName}</Table.Cell>
                    <Table.Cell>{rider.team}</Table.Cell>
                    <Table.Cell>{rider.proWins}</Table.Cell>
                </Table.Row>
            )
        })
    }

    handleClick = (rider) => {
        console.log(rider.displayName);
        this.setState({ modalRider: rider, modalOpen: true })
    }

    render() {
        return (
            <div>
                <Modal open={this.state.modalOpen}>
                <Modal.Header>{this.state.modalRider.displayName}</Modal.Header>
                <Modal.Description>nationality: {this.state.modalRider.nationality}</Modal.Description>
                <Button onClick={() => this.setState({ modalOpen: false })}>Close</Button>
            </Modal>
            <Table celled compact selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Team</Table.HeaderCell>
                        <Table.HeaderCell>Pro-Wins</Table.HeaderCell>
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
    const dataFetched = state.race.fetched;
    const riders = state.race.riders;
    return {
        dataFetched,      
        riders
    };
}

export default connect(mapStateToProps)(RiderChoiceTable);