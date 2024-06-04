import React, { Component } from 'react';
import { instance } from '../utils/AxiosConfig';
import { userActionCreator } from '../redux/actionCreator/userAction';
import { store } from '../redux/store';

class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const jwt = localStorage.getItem('jwtToken');
    if (!jwt) {
      this.props.history.push('/login');
    }

    try {
      const res = await instance.get('/getUser', {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log(res);
      this.setState({ user: res.data.userdata.doc });
      localStorage.username = res.data.userdata.doc.username;
      var user = res.data.userdata.doc;
      this.setState({ user: user });
      var action = userActionCreator(user, 'AddUser');
      store.dispatch(action);
    } catch (err) {
      localStorage.removeItem('jwtToken');
      this.props.history.push('/login');
    }
  }

  render() {
    console.log('hello', this.state.user);
    if (this.state.user === undefined) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default AuthComponent;
