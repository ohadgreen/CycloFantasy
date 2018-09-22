import React from 'react';
import { Link } from 'react-router-dom';

class AuthMain extends React.Component {
    render() {
        return (
            <div>
                <h2>Authenticate</h2>
                <p><Link to='/login'>Login</Link></p>
                <p><Link to='/register'>Register</Link></p>
            </div>
        )
    }
}
export default AuthMain;