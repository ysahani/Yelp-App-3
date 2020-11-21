import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class MakeReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: '1',
    };
  }

  handleChange = (e) => {
    this.setState({
      rate: e.target.value,
    });
  }

  review =() => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;
    const { rate } = this.state;
    console.log(today);
    const rev = document.getElementById('reviews').value;
    console.log(this.props.email);
    const data = {
      customer_email: this.props.email,
      customer_name: this.props.name,
      date: today,
      rating: rate,
      comment: rev,
      r_name: this.props.rName,
    };

    axios.post('http://localhost:3001/customer/makereview', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.props.history.push('/restaurantprof');
        } else {
          console.log('Error in make review!');
        }
      });
  }

  render() {
    const { rate } = this.state;
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
          <br />
          <h4>
            Make a Review for
            {' '}
            {this.props.rName}
          </h4>
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>
          <label htmlFor="rate">Give a Rating out of 5</label>
          <select name="rate" id="rating" onChange={this.handleChange} value={rate}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br />
          <textarea id="reviews" rows="10" cols="70" />
          <br />
          <button type="submit" onClick={this.review}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rName: state.rName,
  name: state.name,
  city: state.city,
  state: state.state,
  email: state.email,
});
export default connect(mapStateToProps)(MakeReview);
