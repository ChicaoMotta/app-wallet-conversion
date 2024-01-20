import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { saveUserEmail } from '../redux/actions';

import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  checkEmail = (email) => {
    const validateEmail = email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    return !!validateEmail;
  };

  checkPassword = (password) => {
    const minPasswordLenght = 6;
    return password.length >= minPasswordLenght;
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const validatedEmail = this.checkEmail(email);
      const validatedPassword = this.checkPassword(password);
      if (validatedEmail && validatedPassword) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  };

  logUserIn = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(saveUserEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <section className='h-100' style={{ backgroundColor: 'darkkhaki' }}>
        <div className="container">
          <div className="row align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="col-md-6 p-5 text-center rounded" style={{

              background: 'white'
            }}>

              <h1 className='mb-4'>Login</h1>

              <label htmlFor="email" className='d-flex flex-column mb-4'>
                Enter valid email:
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  data-testid="email-input"
                />

              </label>
              <label htmlFor="password" className='d-flex flex-column mb-4'>
                Enter password (at least 6 characters long):
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  data-testid="password-input"
                />
              </label>
              <button
                onClick={this.logUserIn}
                disabled={disabled}
                className='px-4 py-3'
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
