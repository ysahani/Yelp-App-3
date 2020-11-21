import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Reviews.css';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rname: this.props.rname,
      res: [],
    };
  }

  componentDidMount() {
    const { rname } = this.state;
    const data = {
      r_name: rname,
    };
    axios.post('http://localhost:3001/restaurant/reviews', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            res: response.data,
          });
          console.log('Post success in reviews!');
        } else {
          console.log('Post error in reviews!');
        }
      });
  }

  render() {
    const contents = this.state.res.map((item) => (
      <tr>
        <td>
          {item.customer_name}
        </td>
        <td>
          {item.date}
        </td>
        <td>
          {item.rating}
        </td>
        <td>
          {item.comments}
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
            Reviews
          </h4>
        </div>
        <div>
          <ul style={{ listStyle: 'none' }}>
            <li><Link to="/restaurantpage">Profile Overview</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reviewspage">Reviews</Link></li>
          </ul>
        </div>
        <table>
          {contents}
        </table>
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

export default connect(mapStateToProps)(Reviews);
