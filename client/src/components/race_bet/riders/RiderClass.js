import React from 'react';
import './Rider.css';
import InfoPopup from './InfoPopup';
import { Eject, Info } from '@material-ui/icons'

class RiderClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rider: {},
            showPop: false,
        }
    }

    componentDidMount() {
        this.setState({ rider: props });
    }

    renderBlock = () =>{
        return (
            <div className="box">
                <b style={{
                    position: "absolute",
                    top: "3px",
                    textAlign: "left",
                    width: "120px"
                }}>{props.name}</b>

                <Info
                    fontSize="small"
                    style={{ color: "green", position: "absolute", bottom: "0px", left: "10px", iconHoverColor: '#55ff55' }}
                    onClick={() => console.log(props.name + ' info')}
                />
                <Eject
                    fontSize="small"
                    style={{ position: "absolute", bottom: "0px", right: "10px" }}
                    onClick={() => props.onClick(props)}
                />
            </div>
        )
    }

    render() {
        if (!this.props.show) {
            return null;
        }

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

export default RiderClass;

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