import React from 'react';
import { connect } from 'react-redux';

class UserInfo extends React.Component {

    render() {
        return (
            <div>
                <div>Welcome {this.props.user.nickname}</div>
                <div>
                    {/* <RaceInfo /> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const user = state.userAuth.user;
    console.log('user info: ', user);

    return {
        user
    };
}

export default connect(mapStateToProps)(UserInfo);