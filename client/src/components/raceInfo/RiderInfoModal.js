import React from 'react';
import { Modal, Button, Image } from 'semantic-ui-react';

export const RiderInfoModal = (props) => {
    return (
            <Modal size='mini' open={props.modalOpen}>
                <Modal.Header>{props.modalRider.displayName}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='small' src={props.imgDisplay} />
                    <Modal.Description>
                        <p><b>Nationality: </b>{props.modalRider.nationality}</p>
                        <p><b>Team: </b>{props.modalRider.team}</p>
                        <p><b>Age: </b>{props.modalRider.age}</p>
                        <p><b>Height: </b>{props.modalRider.height} m</p>
                        <p><b>Weight: </b>{props.modalRider.weight} Kg</p>
                        <p><b>Pro wins: </b>{props.modalRider.proWins}</p>
                        <p><b>Grand Tours: </b>{props.modalRider.grandTours}</p>
                        <p><a href={props.modalRider.pageUrl}>PCS page</a></p>
                    </Modal.Description>
                </Modal.Content>
                <Button onClick={() => props.closeModal()}>Close</Button>
            </Modal>
            )
}