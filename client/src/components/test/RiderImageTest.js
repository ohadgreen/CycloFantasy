import React from 'react';
import imageService from '../../services/images.service'

class RiderImage extends React.Component {
    state = {
        image: ''
    }

    async componentDidMount() {
        const reqParams = { team: 'bora-hansgrohe', normName: 'daniel-oss' };
        const image = await imageService.getRiderImage(reqParams);
        this.setState({ image: image });
    }

    render() {
        const imgPlaceholderSrc = require('../../resources/images/riderImages/rider-placeholder.jpg');
        const imgDisplay = (this.state.image === '') ? imgPlaceholderSrc : `data:image/png;base64,${this.state.image}`;

        return (
            <div>
                <img src={imgDisplay} />
            </div>
        )
    }
}
export default RiderImage;