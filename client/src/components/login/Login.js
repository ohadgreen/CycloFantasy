import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../../store/userAuth/actions';
import TextField from '@material-ui/core/TextField';

import {testServer} from '../../services/test.service';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {             
    }

    serverTest() {
        const serverMsg = testServer();
        if(serverMsg)
            console.log('login msg:' + serverMsg);   
    }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            userLogin(username, password);
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div>
                <h2>Login Page</h2>
                <form className="flexcontainer" onSubmit={this.handleSubmit}>
                    <TextField style={{ padding: 24 }}
                    required
                    id="outlined-name"
                    label="User Name"
                    value={username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                    />
                    <TextField style={{padding:24}}
                    required
                    id="standard-password-input"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                    />                    
                    <div>
                        <button>Login</button>                                                
                    </div>
                    <div>
                        <button onClick={this.serverTest}>Test</button>                                                
                    </div>
                    <div><Link to="/register">Register</Link>
                        </div>                    

                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const loginUser = state.userAuth;
    (loginUser.user) ?
    console.log('mstp user:' + loginUser.user.nick) : console.log('no authentication');    

    return { loginUser };  
}

export default connect(mapStateToProps)(Login);