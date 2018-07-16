import React from 'react';
import AppShell from '.././components/app-shell/app-shell';

import SelectorView from '../components/authentication/selector-view';
import EmailView from '../components/authentication/email-view';
import RegisterPasswordView from '../components/authentication/register-password-view';

const views = {
  selector: 'SELECTOR',
  email: 'EMAIL',
  registerPassword: 'REGISTER_PASSWORD',
};

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordValidation: '',
      view: views.selector,
    };
  }

  get isEmailValid() {
    return this.state.email.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );
  }

  get isValidPassword() {
    return this.state.password.length > 5 && this.state.password == this.state.passwordValidation;
  }

  setView(view) {
    return () => this.setState({ view });
  }

  setEmail(email) {
    this.setState({ email });
  }

  setPassword(password) {
    this.setState({ password });
  }

  setPasswordValidation(passwordValidation) {
    this.setState({ passwordValidation });
  }

  render() {
    const { email } = this.state;
    const setEmail = this.setEmail.bind(this);
    const setPassword = this.setPassword.bind(this);
    const setView = this.setView.bind(this);

    let view;
    switch (this.state.view) {
      case views.selector:
        view = <SelectorView setView={setView} views={views} />;
        break;
      case views.email:
        view = (
          <EmailView
            email={email}
            setEmail={setEmail}
            setView={setView}
            views={views}
            isValid={this.isEmailValid}
          />
        );
        break;
      case views.registerPassword:
        view = (
          <RegisterPasswordView
            email={email}
            setPassword={setPassword}
            setPasswordValidation={setPasswordValidation}
            setView={setView}
            views={views}
            isValid={this.isPasswordValid}
          />
        );
        break;

      default:
        view = <h2>oops!</h2>;
        break;
    }

    return (
      <AppShell>
        <div className="column centered full-height">{view}</div>
      </AppShell>
    );
  }
}
