import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import './InfoPopup.css';

class InfoPopup extends React.Component {
    render() {
        const imgSrc = require(`../../resources/images/riderImage/${this.props.riderInfo.image}.jpg`);
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 300,
            minHeight: 90,
            margin: '0 auto',
            padding: 10,
            position: 'relative'
        };

        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    <div className="card-container">
                        <div className="rider-image">
                            <img src={imgSrc} alt={this.props.riderInfo.name}></img>
                        </div>
                        <div className="rider-details">
                            name: {this.props.riderInfo.name} <br />
                            age: {this.props.riderInfo.age} <br />
                            nationality: {this.props.riderInfo.nationality} <br />
                            team: {this.props.riderInfo.team} <br />
                            pro wins: {this.props.riderInfo.proWins} <br />
                        </div>
                    </div>
                    <div className="close-info">
                        <Button variant="fab"
                            size="small"
                            onClick={this.props.onClose}>
                            <CloseIcon fontSize="small" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

ModalPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default InfoPopup;