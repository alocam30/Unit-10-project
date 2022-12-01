import React, { Component } from "react";
import Data from "./Data";

const Context = React.createContext();


export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();

    this.state = {
      authenticatedUser: null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  submit = () => {
    const { context } = this.props;
    const {
      emailAddress,
      password,
     } = this.state; 
    const user = { 
      emailAddress,
      password,
     };

    context.data.createUser(user)
     .then( errors => {
      if (errors.length) {
        this.setState({ errors });
      }
     })
     };
  


  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    const plainText = password;

    if (user !== null) {
      user.password = plainText;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}

