import React from 'react';
import { withRouter } from 'next/router';
import AppShell from '../components/app-shell/app-shell';

import EmailView from '../components/authentication/email-view';
import LoadingView from '../components/authentication/loading-view';
import LoginPasswordView from '../components/authentication/login-password-view';
import RegisterPasswordView from '../components/authentication/register-password-view';
import SelectorView from '../components/authentication/selector-view';

const views = {
  email: 'EMAIL',
  loading: 'LOADING',
  loginPassword: 'LOGIN_PASSWORD',
  selector: 'SELECTOR',
  registerPassword: 'REGISTER_PASSWORD',
};

export default withRouter(
  class Login extends React.Component {
    constructor() {
      super();
      this.state = {
        email: '',
        loadingMessage: 'wait for it...',
        password: '',
        passwordValidation: '',
        view: views.selector,
      };
    }

    get auth() {
      return window.firebase.auth();
    }

    get isEmailValid() {
      return this.state.email.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      );
    }

    get isValidPassword() {
      return this.state.password.length > 5;
    }

    get isValidPasswordValidation() {
      return this.isValidPassword && this.state.password == this.state.passwordValidation;
    }

    componentDidMount() {
      this.unsubscribe = this.auth.onAuthStateChanged(async currentUser => {
        if (currentUser) {
          this.props.router.push('/app/dashboard');
        }
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
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

    signInWithPopup(providerName) {
      return () => {
        const providers = {
          google: firebase && new firebase.auth.GoogleAuthProvider(),
          facebook: firebase && new firebase.auth.FacebookAuthProvider(),
        };

        providers.google.addScope('email');
        providers.facebook.addScope('email');

        firebase
          .auth()
          .signInWithPopup(providers[providerName])
          .catch(({ message }) => {
            throw new HandledError(message);
          });
      };
    }

    register(email, password) {
      this.loading('Thanks for registering 😍');
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .catch(error => this.handleError(error));
    }

    signIn(email, password) {
      this.loading("We're signing you in!");
      this.auth.signInWithEmailAndPassword(email, password).catch(error => this.handleError(error));
    }

    reset(email) {
      this.loading('Sending a reset email 💌');
      this.auth.sendPasswordResetEmail(email).catch(error => this.handleError(error));
    }

    async handleError(error) {
      console.info('error', error);
      await this.returnFromLoading();

      throw new HandledError(error);
    }

    async returnFromLoading() {
      return new Promise(resolve =>
        setTimeout(() => {
          this.setView(views.selector)();
          resolve();
        }, 1000 * 2)
      );
    }

    loading(loadingMessage) {
      this.setState({
        view: views.loading,
        loadingMessage: loadingMessage || this.state.loadingMessage,
      });
    }

    render() {
      const { email, loadingMessage, password, passwordValidation } = this.state;

      const setEmail = this.setEmail.bind(this);
      const setPassword = this.setPassword.bind(this);
      const setPasswordValidation = this.setPasswordValidation.bind(this);
      const setView = this.setView.bind(this);

      const signInWithPopup = this.signInWithPopup.bind(this);
      const register = this.register.bind(this);
      const reset = this.reset.bind(this);
      const signIn = this.signIn.bind(this);

      let view;
      switch (this.state.view) {
        case views.email:
          view = (
            <EmailView
              email={email}
              isValid={this.isEmailValid}
              setEmail={setEmail}
              setView={setView}
              views={views}
            />
          );
          break;

        case views.loading:
          view = <LoadingView loadingMessage={loadingMessage} setView={setView} views={views} />;
          break;

        case views.loginPassword:
          view = (
            <LoginPasswordView
              email={email}
              isValid={this.isValidPassword}
              password={password}
              reset={reset}
              setPassword={setPassword}
              setView={setView}
              signIn={signIn}
              views={views}
            />
          );
          break;

        case views.registerPassword:
          view = (
            <RegisterPasswordView
              email={email}
              isValid={this.isValidPasswordValidation}
              password={password}
              passwordValidation={passwordValidation}
              register={register}
              setPassword={setPassword}
              setPasswordValidation={setPasswordValidation}
              setView={setView}
              views={views}
            />
          );
          break;

        case views.selector:
          view = <SelectorView signInWithPopup={signInWithPopup} setView={setView} views={views} />;
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
);
