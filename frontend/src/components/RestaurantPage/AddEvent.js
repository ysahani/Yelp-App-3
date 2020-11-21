import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      time: '',
      date: '',
      location: '',
      hashtags: '',
    };
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  }

  handleTime = (e) => {
    this.setState({
      time: e.target.value,
    });
  }

  handleDate = (e) => {
    this.setState({
      date: e.target.value,
    });
  }

  handleLocation = (e) => {
    this.setState({
      location: e.target.value,
    });
  }

  handleHashtags = (e) => {
    this.setState({
      hashtags: e.target.value,
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { description } = this.state;
    const { time } = this.state;
    const { date } = this.state;
    const { location } = this.state;
    const { hashtags } = this.state;

    const data = {
      name: this.props.name,
      ename: name,
      desc: description,
      atime: time,
      adate: date,
      loc: location,
      htag: hashtags,
    };

    axios.post('http://localhost:3001/restaurant/addevent', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.props.history.push('/restaurantevents');
        } else {
          console.log('Post error in add event!');
        }
      });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <form className="yform">
          <label htmlFor="form-text">Name</label>
          <span className="help-block">Name of Event</span>
          <input id="form-text" name="form-text" type="text" onChange={this.handleName} />
          <br />
          <br />
          <label htmlFor="form-text">Description</label>
          <span className="help-block">Description of Event</span>
          <input id="form-text" name="form-text" type="text" onChange={this.handleDescription} />
          <br />
          <br />
          <label htmlFor="form-text">Time</label>
          <span className="help-block">Time of Event</span>
          <input id="form-text" name="form-text" type="text" onChange={this.handleTime} />
          <br />
          <br />
          <label htmlFor="form-text">Date</label>
          <span className="help-block">Date of Event</span>
          <input id="form-text" name="form-text" type="text" onChange={this.handleDate} />
          <br />
          <br />
          <label htmlFor="form-text">Location</label>
          <span className="help-block">Location of Event</span>
          <input id="form-text" name="form-text" type="text" onChange={this.handleLocation} />
          <br />
          <br />
          <label htmlFor="form-text">Hashtags</label>
          <span className="help-block">#Hashtags For Your Event</span>
          <input id="form-text" name="form-text" type="text" onChange={this.handleHashtags} />
          <br />
          <br />
          <button onClick={this.submitForm} type="submit">Update</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
});

export default connect(mapStateToProps)(AddEvent);