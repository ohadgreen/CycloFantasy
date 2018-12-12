import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLoginValidate } from '../../store/userAuth/actions';
import TextField from '@material-ui/core/TextField';

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
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(`login submit ${this.state.username} ${this.state.password}`);

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            const userLogin = { username: username, password: password };
            dispatch(userLoginValidate(userLogin));
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <h2>Login Page</h2>
                <form className="flexcontainer" onSubmit={this.handleSubmit}>
                    <label>{this.props.errorMsg}</label>
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
                    <div><Link to="/register">Register</Link>
                        </div>                    

                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const loginUser = state.userAuth;
    let user;
    let errorMsg = '';
    (loginUser.user) ?
        (user = loginUser.user) : (errorMsg = loginUser.loginResult);    

    return { user, errorMsg };  
}

export default connect(mapStateToProps)(Login);