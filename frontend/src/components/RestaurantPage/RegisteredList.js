import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

class RegisteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: this.props.eventName,
      res: [],
    };
  }

  componentDidMount() {
    const { eventName } = this.state;
    const data = {
      eName: eventName,
    };

    axios.post('http://localhost:3001/restaurant/registeredlist', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          // console.log(response.data);
          this.setState({
            res: response.data,
          });
          this.state.res.forEach((item) => {
            console.log(item.name);
          });
        } else {
          console.log('Post error in restaurant events!');
        }
      });
  }

  clickLin = (e) => {
    this.props.updateCname(e.currentTarget.textContent);
  }

  render() {
    const contents = this.state.res.map((item) => (
      <tr>
        <td>
          <Link to="/viewcustomer" onClick={this.clickLin}>{item}</Link>
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
            Registered Customers
          </h4>
        </div>
        <div style={{ textAlign: 'center' }}>
          <br />
          <h5 style={{ textDecoration: 'underline' }}>
            Event Name:
            {' '}
            {this.props.eventName}
          </h5>
        </div>
        <div style={{ textAlign: 'center' }}>
          <table style= {{ position: 'relative', left: '590px' }}>
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
  eventName: state.eventName,
});

const mapDispatchToProps = (dispatch) => ({
  updateCname: (cnam) => {
    dispatch({
      type: 'UPDATE_CNAME', cName: cnam,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredList);
