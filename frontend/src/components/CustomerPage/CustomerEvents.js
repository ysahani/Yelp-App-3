import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

class CustomerEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      res: [],
      search: null,
      viewreg: [],
      email: this.props.email,
      things: [],
      regi: [],
    };
  }

  componentDidMount() {
    const arr = [];
    const { name } = this.state;
    const data = {
      aname: name,
    };

    axios.post('http://localhost:3001/customer/customerevents', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          //  console.log(response.data);
          this.setState({
            res: response.data,
          });
          this.state.res.forEach((item) => {
            for (let i = 0; i < item.length; i++) {
              arr.push(item[i]);
            }
          });
          arr.sort((a, b) => new Date(a.date) - new Date(b.date));
          console.log(arr);
          arr.forEach((item) => {
            const joined = this.state.things.concat(item);
            this.setState({ things: joined });
          });
        } else {
          console.log('Post error in restaurant events!');
        }
      });

    const { email } = this.state;
    const edata = {
      aEmail: email,
    };
    axios.post('http://localhost:3001/customer/showRegistered', edata)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            viewreg: response.data,
          });
          this.state.viewreg.forEach((item) => {
            for (let i = 0; i < item.length; i++) {
              const joined = this.state.regi.concat(item[i]);
              this.setState({ regi: joined });
            }
          });
        } else {
          console.log('Post error in restaurant events!');
        }
      });
  }

  submitSearch = (e) => {
    e.preventDefault();
    const search = document.getElementById('searchInput').value;
    const data = {
      asearch: search,
    };
    console.log(data.asearch);
    axios.post('http://localhost:3001/customer/customerevent', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            search: response.data,
          });
          const { search } = this.state;
          this.props.updateEvent(search.name, search.description, search.time, search.date, search.location, search.hashtags);
        //   console.log(this.state.search);
        } else {
          console.log('Post error in restaurant events!');
        }
      });
  }

  render() {
    const { search } = this.state;
    let result;
    if (search === null) {
      result = null;
    } else {
      result = (
        <div>
          <br />
          <p><Link to="/registerevent">{search.name}</Link></p>
        </div>
      );
    }
    const contents = this.state.things.map((item) => (
      <tr>
        <td>
          {item.name}
          <br />
          {item.description}
          <br />
          {item.time}
          <br />
          {item.date.substring(0, 10)}
          <br />
          {item.location}
          <br />
          {item.hashtags}
          <br />
        </td>
      </tr>
    ));
    const viewreg = this.state.regi.map((item) => (
      <tr>
        <td>
          {item.event_name}
          <br />
        </td>
      </tr>
    ));
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
            Search Event
          </h4>
          <input id="searchInput" placeholder="Type Event Name.." />
          <button type="submit" onClick={this.submitSearch}>Search</button>
          <div>
            { result }
          </div>
          <br />
          <hr className="aLine" />
          <h4>
            Events
          </h4>
        </div>
        <div style={{ textAlign: 'center' }}>
          <table style={{
            backgroundColor: '#D2691E', color: 'white', position: 'relative', left: '550px',
          }}
          >
            { contents }
          </table>
        </div>
        <br />
        <hr className="aLine" />
        <div id="events">
          <h4>
            Registered Events
          </h4>
        </div>
        <table style={{
          backgroundColor: '#D2691E', color: 'white', position: 'relative', left: '550px',
        }}
        >
          { viewreg }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
  yelpingSince: state.yelpingSince,
  thingsILove: state.thingsILove,
  findMeIn: state.findMeIn,
  blogsite: state.blogsite,
  dob: state.dob,
  city: state.city,
  state: state.state,
  country: state.country,
  nickname: state.nickname,
  phone: state.phone,
});

const mapDispatchToProps = (dispatch) => ({
  updateEvent: (name, desc, time, date, loc, htags) => {
    dispatch({
      type: 'UPDATE_EVENT', eventName: name, eventDesc: desc, eventTime: time, eventDate: date, eventLoc: loc, eventHtags: htags,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEvents);
