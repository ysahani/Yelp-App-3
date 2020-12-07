import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import { updateCust } from '../../mutations/mutations';

class UpdateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpingSince: this.props.yelpingSince,
      iLove: this.props.thingsILove,
      findMeIn: this.props.findMeIn,
      blogsite: this.props.blogsite,
      name: this.props.name,
      dateob: this.props.dob,
      city: this.props.city,
      state: this.props.state,
      country: this.props.country,
      nickname: this.props.nickname,
      emailid: this.props.email,
      phone: this.props.phone,
    };
  }

  handleSince = (e) => {
    this.setState({
      yelpingSince: e.target.value,
    });
  }

  handleiLove = (e) => {
    this.setState({
      iLove: e.target.value,
    });
  }

  handlefindMeIn = (e) => {
    this.setState({
      findMeIn: e.target.value,
    });
  }

  handleblogsite = (e) => {
    this.setState({
      blogsite: e.target.value,
    });
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleDateob = (e) => {
    this.setState({
      dateob: e.target.value,
    });
  }

  handleCity = (e) => {
    this.setState({
      city: e.target.value,
    });
  }

  handleState = (e) => {
    this.setState({
      state: e.target.value,
    });
  }

  handleCountry = (e) => {
    this.setState({
      country: e.target.value,
    });
  }

  handleNickName = (e) => {
    this.setState({
      nickname: e.target.value,
    });
  }

  handleEmail = (e) => {
    this.setState({
      emailid: e.target.value,
    });
  }

  handlePhone = (e) => {
    this.setState({
      phone: e.target.value,
    });
  }

  submitUpdate = (e) => {
    e.preventDefault();
    const { yelpingSince } = this.state;
    const { iLove } = this.state;
    const { findMeIn } = this.state;
    const { blogsite } = this.state;
    const { name } = this.state;
    const { dateob } = this.state;
    const { city } = this.state;
    const { state } = this.state;
    const { country } = this.state;
    const { nickname } = this.state;
    const { emailid } = this.state;
    const { phone } = this.state;

    const data = {
      yelpSince: yelpingSince,
      love: iLove,
      findIn: findMeIn,
      weblog: blogsite,
      fullname: name,
      dob: dateob,
      acity: city,
      astate: state,
      acountry: country,
      nname: nickname,
      email: emailid,
      aPhone: phone,
    };

    axios.post('http://localhost:3001/customer/updatecustomer', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(findMeIn);
          this.props.updateCustomer(yelpingSince, iLove, findMeIn, blogsite, name, dateob, city, state, country, nickname, emailid, phone);
          this.props.history.push('/customerpage');
        } else {
          console.log('Post error in update customer!');
        }
      });

    this.props.updateCust({
      variables: {
        email: data.email,
        name: data.fullname,
        yelpingSince: data.yelpSince,
        thingsILove: data.love,
        findMeIn: data.findIn,
        blogsite: data.weblog,
        dob: data.dob,
        city: data.acity,
        state: data.astate,
        country: data.acountry,
        nickname: data.nname,
        phone: data.aPhone,
      },
    }).then((res) => {
      console.log(res);
      this.props.updateCustomer(yelpingSince, iLove, findMeIn, blogsite, name, dateob, city, state, country, nickname, emailid, phone);
      this.props.history.push('/customerpage');
    });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <form className="yform">
          <label htmlFor="form-text">Yelping Since</label>
          <span className="help-block">Date You Started Yelp</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.yelpingSince} onChange={this.handleSince} />
          <br />
          <br />
          <label htmlFor="form-text">Things I Love</label>
          <span className="help-block">Any Hobbies, Passions, etc.</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.thingsILove} onChange={this.handleiLove} />
          <br />
          <br />
          <label htmlFor="form-text">Find Me In</label>
          <span className="help-block">Places You Like to Go</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.findMeIn} onChange={this.handlefindMeIn} />
          <br />
          <br />
          <label htmlFor="form-text">My Blog/Website</label>
          <span className="help-block">Enter a URL</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.blogsite} onChange={this.handleblogsite} />
          <br />
          <br />
          <label htmlFor="form-text">Name</label>
          <span className="help-block">Your Full Name</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.name} onChange={this.handleName} />
          <br />
          <br />
          <label htmlFor="form-text">DOB</label>
          <span className="help-block">Your Date of Birth</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.dob} onChange={this.handleDateob} />
          <br />
          <br />
          <label htmlFor="form-text">City</label>
          <span className="help-block">City You Reside In</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.city} onChange={this.handleCity} />
          <br />
          <br />
          <label htmlFor="form-text">State</label>
          <span className="help-block">State You Reside In</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.state} onChange={this.handleState} />
          <br />
          <br />
          <label htmlFor="form-text">Country</label>
          <span className="help-block">Country You Reside In</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.country} onChange={this.handleCountry} />
          <br />
          <br />
          <label htmlFor="form-text">Nick Name</label>
          <span className="help-block">An Alias</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.nickname} onChange={this.handleNickName} />
          <br />
          <br />
          <label htmlFor="form-text">Email ID</label>
          <span className="help-block">Email Adress</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.email} onChange={this.handleEmail} />
          <br />
          <br />
          <label htmlFor="form-text">Phone Number</label>
          <span className="help-block">Your Phone Number</span>
          <input id="form-text" name="form-text" type="text" defaultValue={this.props.phone} onChange={this.handlePhone} />
          <br />
          <br />
          <button onClick={this.submitUpdate} type="submit">Save</button>
        </form>
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
  updateCustomer: (yelpingSince, iLove, findMeIn, blogsite, name, dateob, city, state, country, nickname, emailid, phone) => {
    dispatch({
      type: 'UPDATE_CUSTOMER', yelpSince: yelpingSince, love: iLove, findIn: findMeIn, weblog: blogsite, fullname: name, dob: dateob, acity: city, astate: state, acountry: country, nname: nickname, email: emailid, aPhone: phone,
    });
  },
});

export default compose(
  graphql(updateCust, { name: 'updateCust' }),
  connect(mapStateToProps, mapDispatchToProps),
)(UpdateCustomer);
