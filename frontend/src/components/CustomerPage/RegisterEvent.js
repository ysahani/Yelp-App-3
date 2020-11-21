import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class RegisterEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: this.props.eventName,
      email: this.props.email,
    };
  }

  register = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { eventName } = this.state;
    const data = {
      aEmail: email,
      eName: eventName,
    };
    axios.post('http://localhost:3001/customer/registerevent', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Register Success!');
          this.props.history.push('/customerevents');
        } else {
          console.log('Post error in register event!');
        }
      });
  }

  render() {
    return (
      <div>
        <div id="header">
          <h1>{this.props.name}</h1>
          <h2>
            {this.props.city}
            ,
            {' '}
            {this.props.state}
          </h2>
          <hr id="line" />
        </div>
        <div id="events">
          <h4>
            Register for Event
          </h4>
        </div>
        <button id="registerButton" type="submit" onClick={this.register}>Register for Event+</button>
        <div style={{ textAlign: 'center', border: 'solid', borderWidth: '40px' }}>
          <br />
          <p>{this.props.eventName}</p>
          <br />
          <p>{this.props.eventDesc}</p>
          <br />
          <p>{this.props.eventTime}</p>
          <br />
          <p>{this.props.eventDate}</p>
          <br />
          <p>{this.props.eventLoc}</p>
          <br />
          <p>{this.props.eventHtags}</p>
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  state: state.state,
  city: state.city,
  eventName: state.eventName,
  eventDesc: state.eventDesc,
  eventTime: state.eventTime,
  eventDate: state.eventDate,
  eventLoc: state.eventLoc,
  eventHtags: state.eventHtags,
  email: state.email,
});

export default connect(mapStateToProps)(RegisterEvent);
