import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class ViewCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cName: this.props.cname,
      res: '',
    };
  }

  componentDidMount() {
    const { cName } = this.state;
    let data = {
      cname: cName,
    };

    axios.post('http://localhost:3001/getcustomeremail', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data[0].email);
          this.props.updateCemail(response.data[0].email);
        } else {
          console.log('Post error in restaurant events!');
        }
      });

    axios.post('http://localhost:3001/restaurant/viewcustomer', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            res: response.data[0],
          });
          console.log(this.state.res);
        } else {
          console.log('Post error in restaurant events!');
        }
      });
    const { cEmail } = this.props;
    data = {
      email: cEmail,
    };
    console.log('DSAF');
    console.log(cEmail);
    axios.post('http://localhost:3001/getcustomerurl', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data);
          this.props.updateURL(response.data[0].url);
          console.log(this.state.res.yelpingSince);
        } else {
          console.log('Post error in restaurant events!');
        }
      });
  }

  render() {
    const { res } = this.state;
    const { url } = this.props;
    return (
      <div>
        <div id="header">
          <h1>{this.props.rname}</h1>
          <h2>{this.props.location}</h2>
          <hr id="line" />
        </div>
        <div>
          <br />
          <h4 className="aTitle">About</h4>
          <p className="details">
            Yelping Since:
            {' '}
            { res.yelpingSince }
          </p>
          <p className="details">
            Things I love:
            {' '}
            {res.thingsILove}
          </p>
          <p className="details">
            Find Me In:
            {' '}
            {res.findMeIn}
          </p>
          <p className="details">
            My Blog/Website:
            {' '}
            {res.blogsite}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Basic Details</h4>
          <p className="details">
            Name:
            {' '}
            {res.name}
          </p>
          <p className="details">
            City:
            {' '}
            {res.city}
          </p>
          <p className="details">
            State:
            {' '}
            {res.state}
          </p>
          <p className="details">
            Country:
            {' '}
            {res.country}
          </p>
          <p className="details">
            Nick Name:
            {' '}
            {res.nickname}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Contact Information</h4>
          <p className="details">
            Email ID:
            {' '}
            {res.email}
          </p>
          <p className="details">
            Phone Number:
            {' '}
            {res.phone}
          </p>
        </div>
        <img
          src="https://yelppictures.s3-us-west-1.amazonaws.com/85b29161-0328-4f97-ab30-84cb0af962a6"
          alt=""
          style={{
            position: 'relative', bottom: '470px', left: '20px', border: 'solid',
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rname: state.name,
  location: state.location,
  cname: state.cName,
  url: state.url,
  cEmail: state.cEmail,
});

const mapDispatchToProps = (dispatch) => ({
  updateURL: (url) => {
    dispatch({
      type: 'UPDATE_URL', aurl: url,
    });
  },
  updateCemail: (email) => {
    dispatch({
      type: 'UPDATE_CEMAIL', cEmail: email,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomer);
