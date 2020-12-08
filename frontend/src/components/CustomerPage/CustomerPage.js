import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './CustomerPage.css';
import { searchRestaurant } from '../../mutations/mutations';

class CustomerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      res: [],
      pictures: [],
      url: '',
      option: 'Curbside Pickup',
    };
    this.onDrop = this.onDrop.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
  }

  componentDidMount() {
    const data = {
      email: this.props.email,
    };
    axios.post('http://localhost:3001/images/getcustomerurl', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            url: response.data,
          });
          const { url } = this.state;
          console.log('asdf');
          this.props.updateURL(response.data[0].url);
          console.log(`"${response.data[0].url}"`);
          console.log('Post success in customerurl!');
        } else {
          console.log('Post error in customerurl!');
        }
      });
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  uploadImages() {
    console.log(this.state.pictures);
    const uploadPromises = this.state.pictures.map((image) => {
      const data = new FormData();
      data.append('image', image, image.name);
      return axios.post('http://localhost:3001/images/uploadImage', data);
    });
    axios.all(uploadPromises)
      .then((results) => {
        console.log('server response: ');
        const url = JSON.stringify(results[0].data.downloadUrl);
        this.props.updateURL(results[0].data.downloadUrl);
        console.log(url);
      })
      .catch((e) => {
        console.log(e);
      });
    const data = {
      anEmail: this.props.email,
      url: this.props.url,
    };
    this.setState({
      url: this.props.url,
    });
    axios.post('http://localhost:3001/images/customerurl', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Post success in customerurl!');
        } else {
          console.log('Post error in customerurl!');
        }
      });
  }

  search = (e) => {
    this.setState({
      val: document.getElementById('searchh').value,
    });
    const { option } = this.state;
    e.preventDefault();
    const data = {
      val: document.getElementById('searchh').value,
    };
    this.props.searchRestaurant({
      variables: {
        search: data.val,
        filter: option,
      },
    }).then((res) => {
      console.log(res.data.searchRestaurant);
      if (res.data.searchRestaurant.status === '200') {
        this.props.updateResults(res.data.searchRestaurant);
        this.props.history.push('/viewrestaurant');
      } else {
        console.log('fail search');
      }
    });
    // axios.defaults.headers.common.authorization = localStorage.getItem('token');
    // axios.post('http://localhost:3001/customer/customerpage', data)
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     if (response.status === 200) {
    //       this.setState({
    //         res: response.data,
    //       });
    //       const { res } = this.state;
    //       this.props.updateResults(res);
    //       this.props.history.push('/viewrestaurant');
    //       console.log('Post success in customer page!');
    //     } else {
    //       console.log('Post error in customer page!');
    //     }
    //   });
  }

  handleChange = (e) => {
    this.setState({
      option: e.target.value,
    });
  }

  render() {
    const { option } = this.state;
    const { url } = this.props;
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <input placeholder="Search for Food.." id="searchh" />
          <button type="submit" onClick={this.search}>Search</button>
          <label>
            <select id="persona" onChange={this.handleChange} value={option}>
              <option value="Curbside Pick Up">Curbside Pick Up</option>
              <option value="Dine in">Dine In</option>
              <option value="Yelp Delivery">Yelp Delivery</option>
              <option value="Location">Location</option>
            </select>
          </label>
        </div>
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
        <div>
          <ul style={{ listStyle: 'none' }}>
            <li id="update"><Link to="/updatecustomer">Update Your Page</Link></li>
          </ul>
        </div>
        <div>
          <br />
          <h4 className="aTitle">About</h4>
          <p className="details">
            Yelping Since:
            {' '}
            {this.props.yelpingSince}
          </p>
          <p className="details">
            Things I love:
            {' '}
            {this.props.thingsILove}
          </p>
          <p className="details">
            Find Me In:
            {' '}
            {this.props.findMeIn}
          </p>
          <p className="details">
            My Blog/Website:
            {' '}
            {this.props.blogsite}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Basic Details</h4>
          <p className="details">
            Name:
            {' '}
            {this.props.name}
          </p>
          <p className="details">
            City:
            {' '}
            {this.props.city}
          </p>
          <p className="details">
            State:
            {' '}
            {this.props.state}
          </p>
          <p className="details">
            Country:
            {' '}
            {this.props.country}
          </p>
          <p className="details">
            Nick Name:
            {' '}
            {this.props.nickname}
          </p>
          <hr className="aLine" />
          <h4 className="aTitle">Contact Information</h4>
          <p className="details">
            Email ID:
            {' '}
            {this.props.email}
          </p>
          <p className="details">
            Phone Number:
            {' '}
            {this.props.phone}
          </p>
        </div>
        <img style={{ position: 'relative', bottom: '500px', left: '20px' }} src={url} alt="" />
        <ImageUploader
          withPreview
          withIcon
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png']}
          maxFileSize={5242880}
          style={{
            position: 'relative', bottom: '500px', right: '80px', width: '400px',
          }}
        />
        <button style={{ position: 'relative', bottom: '500px', left: '60px' }} onClick={this.uploadImages} type="submit">Upload Image</button>
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
  url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
  updateResults: (results) => {
    dispatch({
      type: 'UPDATE_RESULTS', sResults: results,
    });
  },
  updateURL: (url) => {
    dispatch({
      type: 'UPDATE_URL', aurl: url,
    });
  },
});

export default compose(
  graphql(searchRestaurant, { name: 'searchRestaurant' }),
  connect(mapStateToProps, mapDispatchToProps),
)(CustomerPage);
