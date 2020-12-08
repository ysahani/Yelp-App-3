import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ViewRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.results,
      res: [],
      lat: 0,
      lon: 0,
    };
  }

  componentDidMount() {
    console.log(this.props.results.content);
    const cityAndState = 'Hayward, CA';
    let mapz = fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=+${
        cityAndState
      }+&key=AIzaSyDXMfnlQDfBnxLn_2kfR20uDbHWHLbdfNg`,
    ).then((res) => res.json())
      .then((data) => data.results[0].geometry.location)
      .then((location) => {
        this.setState = {
          lat: location.lat,
          lon: location.lng,
        };
        return location;
      });
    const lat = mapz;
    console.log(lat);
    this.setState({
      res: this.props.results,
    })
    const { results } = this.state;
    // const data = {
    //   rsults: results,
    // };
    // axios.post('http://localhost:3001/viewrestaurant', data)
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     if (response.status === 200) {
    //       this.setState({
    //         res: response.data,
    //       });
    //       const { res } = this.state;
    //       console.log(res);
    //       console.log('Post success in customer page!');
    //     } else {
    //       console.log('Post error in customer page!');
    //     }
    //   });
  }

  click = (e) => {
    this.props.updateRname(e.currentTarget.textContent);
  }

  render() {
    const { lat } = this.state;
    const { lon } = this.state;
    // const contents = this.state.res.map((item) => (
    //   <div>
    //     <p><Link to="/restaurantprof" onClick={this.click}>{item}</Link></p>
    //     <hr className="line" />
    //   </div>
    // ));
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
            Search Results
          </h4>
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>
        <p><Link to="/restaurantprof" onClick={this.click}>{this.props.results.content}</Link></p>
        </div>
        <Map
          google={this.props.google}
          zoom={7}
          initialCenter={
          {
            lat: 36,
            lng: -122,
          }
        }
        >
          <Marker
            position={{ lat: 37.6688, lng: -122.0810 }}
          />
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.results,
  name: state.name,
  city: state.city,
  state: state.state,
});

const mapDispatchToProps = (dispatch) => ({
  updateRname: (name) => {
    dispatch({
      type: 'UPDATE_RNAME', rName: name,
    });
  },
});

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDXMfnlQDfBnxLn_2kfR20uDbHWHLbdfNg',
})(connect(mapStateToProps, mapDispatchToProps)(ViewRestaurant));

// export default connect(mapStateToProps, mapDispatchToProps)(ViewRestaurant);
// export const ConnectedViewRestaurant = connect(mapStateToProps, mapDispatchToProps)(ViewRestaurant)
