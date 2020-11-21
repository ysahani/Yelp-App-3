import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.rname,
      location: this.props.location,
      description: this.props.description,
      email: this.props.email,
      timings: this.props.timings,
    };
  }

  handleUsername = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleLocation = (e) => {
    this.setState({
      location: e.target.value,
    });
  }

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handleTimings = (e) => {
    this.setState({
      timings: e.target.value,
    });
  }

  submitLogin = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { location } = this.state;
    const { description } = this.state;
    const { email } = this.state;
    const { timings } = this.state;
    const data = {
      rname: name,
      loc: location,
      desc: description,
      emailid: email,
      time: timings,
    };
    this.props.updateProfile(email, name, location, description, timings);
    // make a post request with the user data
    axios.post('http://localhost:3001/restaurant/updateprofile', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.props.history.push('/restaurantpage');
        } else {
          console.log('Post error in update restaurant!');
        }
      });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <form className="yform">
          <label htmlFor="form-text">Name</label>
          <span className="help-block">Name of Restaurant</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.rname} onChange={this.handleUsername} />
          <br />
          <br />
          <label htmlFor="form-text">Location</label>
          <span className="help-block">Schenectady, NY</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.location} onChange={this.handleLocation} />
          <br />
          <br />
          <label htmlFor="form-text">Description</label>
          <span className="help-block">We have a Meixcan cuisine</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.description} onChange={this.handleDescription} />
          <br />
          <br />
          <label htmlFor="form-text">Contact Information</label>
          <span className="help-block">Phone No., Email, etc.</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.email} onChange={this.handleEmail} />
          <br />
          <br />
          <label htmlFor="form-text">Timings</label>
          <span className="help-block">5AM - 6 PM</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.timings} onChange={this.handleTimings} />
          <br />
          <br />
          <button onClick={this.submitLogin} type="submit">Save</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rname: state.name,
  location: state.location,
  email: state.email,
  description: state.description,
  timings: state.timings,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (user, name, loc, desc, time) => {
    dispatch({
      type: 'UPDATE_PROFILE', email: user, rname: name, location: loc, description: desc, timings: time,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
