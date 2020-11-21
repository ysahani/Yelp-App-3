import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Yelp from '../../download.png';
// const jwtDecode = require('jwt-decode');

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      timings: '',
      username: '',
      password: '',
      restaurantName: '',
      location: '',
      customerName: '',
      yelpingSince: '',
      thingsILove: '',
      findMeIn: '',
      blogSite: '',
      dob: '',
      city: '',
      state: '',
      country: '',
      nickname: '',
      phone: '',
      token: '',
      // err: true,
    };
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  // submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    // const headers = new Headers();
    // prevent page from refresh
    e.preventDefault();

    const { username } = this.state;
    const { password } = this.state;

    const data = {
      user: username,
      pass: password,
    };
    // set the with credentials to true
    axios.defaults.withCredentials = true;
    // make a post request with the user data
    axios.post('http://localhost:3001/user/login', data)
      .then((response) => {
        this.setState({
          token: response.data,
        });
        const { token } = this.state;
        const decoded = jwtDecode(token.split(' ')[1]);

        console.log('THINGG');
        console.log(decoded.name);
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            restaurantName: decoded.name,
            location: decoded.location,
          });
          if (decoded.persona === 'customer') {
            this.setState({
              customerName: decoded.cname,
              yelpingSince: decoded.yelpingSince,
              thingsILove: decoded.thingsILove,
              findMeIn: decoded.findMeIn,
              blogSite: decoded.blogsite,
              dob: decoded.dob,
              city: decoded.city,
              state: decoded.state,
              country: decoded.country,
              nickname: decoded.nickname,
              phone: decoded.phone,
            });
            const { customerName } = this.state;
            const { yelpingSince } = this.state;
            const { thingsILove } = this.state;
            const { findMeIn } = this.state;
            const { blogSite } = this.state;
            const { dob } = this.state;
            const { city } = this.state;
            const { state } = this.state;
            const { country } = this.state;
            const { nickname } = this.state;
            const { phone } = this.state;
            const persona = 'Customer';
            this.props.loginCustomer(username, customerName, yelpingSince, thingsILove, findMeIn, blogSite, dob, city, state, country, nickname, phone, persona);
            this.props.history.push('/customerpage');
          } else {
            this.setState({
              restaurantName: decoded.name,
              location: decoded.location,
              description: decoded.description,
              timings: decoded.timings,
            });
            const { restaurantName } = this.state;
            const { location } = this.state;
            const { description } = this.state;
            const { timings } = this.state;
            const persona = 'Restaurant';
            this.props.logUserIn(username, restaurantName, location, description, timings, persona);
          }
        } else {
          this.props.dontLogUserIn();
        }
      });
  }

  render() {
    const { token } = this.state;
    const { err } = this.state;
    if (token.length > 0) {
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token.split(' ')[1]);
      localStorage.setItem('id', decoded._id);
    }
    let errButton;
    if (this.props.isLoggedIn === false) {
      errButton = <p style={{ color: 'red', textAlign: 'center' }}>Please Enter Correct Credentials</p>;
    } else if (this.props.isLoggedIn === true) {
      errButton = null;
    }
    let redirectVar = null;
    if (this.props.isLoggedIn === true) {
      redirectVar = <Redirect to="/restaurantpage" />;
    }
    return (
      <div style={{ textAlign: 'center' }}>
        { redirectVar }
        <img src={Yelp} alt="" style={{ width: '100px' }} />
        <h2 style={{ color: '#d32323' }}>Log in to Yelp</h2>
        <br />
        <form>
          <label htmlFor="fname">
            <input placeholder="Email" type="text" id="email" name="email" onChange={this.handleUsername} />
          </label>
          <br />
          <label htmlFor="lname">
            <input placeholder="Password" type="password" id="password" name="password" onChange={this.handlePassword} />
          </label>
          <br />
          <button onClick={this.submitLogin} type="submit">Log In</button>
        </form>
        {errButton}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (user, name, loc, desc, time, pers) => {
    dispatch({
      type: 'LOGIN_USER', email: user, rname: name, location: loc, description: desc, timings: time, persona: pers,
    });
  },
  loginCustomer: (user, name, yelpingSince, thingsILove, findMeIn, blogSite, dob, city, state, country, nickname, phone, pers) => {
    dispatch({
      type: 'LOGIN_CUSTOMER',
      email: user,
      cname: name,
      yelpSince: yelpingSince,
      love: thingsILove,
      findMe: findMeIn,
      weblog: blogSite,
      dateob: dob,
      acity: city,
      astate: state,
      acountry: country,
      nname: nickname,
      aphone: phone,
      persona: pers,
    });
  },
  dontLogUserIn: () => { dispatch({ type: 'DONT_LOGIN_USER' }); },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
