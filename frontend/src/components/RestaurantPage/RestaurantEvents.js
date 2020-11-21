import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

class RestaurantEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.rname,
      res: [],
      things: [],
    };
  }

  componentDidMount() {
    const { name } = this.state;
    const data = {
      aname: name,
    };

    axios.post('http://localhost:3001/restaurant/restaurantevents', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // console.log(response.data);
          this.setState({
            res: response.data,
          });
          this.state.res.forEach((item) => {
            console.log(item.length);
            for (let i = 0; i < item.length; i++) {
              const joined = this.state.things.concat(item[i]);
              this.setState({ things: joined });
            }
          });
          console.log(this.state.things);
        } else {
          console.log('Post error in restaurant events!');
        }
      });
  }

  submitEvent = () => {
    this.props.history.push('/addevent');
  }

  clickLink = (e) => {
    e.preventDefault();
    this.props.updateViewvent(e.currentTarget.textContent);
    this.props.history.push('/registeredlist');
  }

  render() {
    // const { res } = this.state;
    const contents = this.state.things.map((item) => (
      <tr>
        <td>
          <Link to="/registerevent" onClick={this.clickLink}>{item.name}</Link>
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
    return (
      <div>
        <div id="header">
          <h1>{this.props.rname}</h1>
          <h2>{this.props.location}</h2>
          <hr id="line" />
        </div>
        <div id="events">
          <h4>
            Events
          </h4>
          <button id="addEvent" onClick={this.submitEvent} type="submit">
            Add Event+
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <table style={{
            backgroundColor: '#D2691E', color: 'white', position: 'relative', left: '550px',
          }}
          >
            { contents }
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rname: state.name,
  location: state.location,
  email: state.email,
  timings: state.timings,
  description: state.description,
});

const mapDispatchToProps = (dispatch) => ({
  updateViewvent: (eName) => {
    dispatch({
      type: 'UPDATE_VIEWVENT', eventName: eName,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantEvents);
