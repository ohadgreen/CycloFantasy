import React from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../../store/userAuth/actions';
import TextField from '@material-ui/core/TextField';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
                nickname: '',
                email: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.username && user.password && user.nickname && user.email) {
            dispatch(userRegister(user));
        }
    }
    render() {
        const { user, submitted } = this.state;
        return (
            <div><h2>Registration</h2>
                <form className="flexcontainer" onSubmit={this.handleSubmit}>
                    <label>{this.props.errorMsg}</label>
                    <TextField style={{ padding: 24 }}
                        required
                        id="outlined-name"
                        label="User Name"
                        name="username"
                        value={user.username}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <TextField style={{ padding: 24 }}
                        required
                        id="standard-password-input"
                        type="password"
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <TextField style={{ padding: 24 }}                        
                        id="outlined-nick"
                        label="Nickname"
                        name="nickname"
                        value={user.nickname}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <TextField style={{ padding: 24 }}
                        required
                        id="outlined-email"
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={this.handleChange}
                        margin="normal"
                    />                    
                    <div>
                        <button>Register</button>
                    </div>                    

                </form></div>
        )
    }
}

function mapStateToProps(state) {
    const { registering } = state.userAuth;
    return {
        registering
    };
}

export default connect(mapStateToProps)(Register);