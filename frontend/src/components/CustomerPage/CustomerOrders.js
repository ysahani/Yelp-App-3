import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import { orders, customerOrders } from '../../queries/queries';

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      res: [],
    };
  }

  componentDidMount() {
    const { name } = this.state;
    const data = {
      cName: name,
    };
    console.log(this.props.data);
    // axios.post('http://localhost:3001/customer/customerorders', data)
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     if (response.status === 200) {
    //       // console.log(response.data);
    //       this.setState({
    //         res: response.data,
    //       });
    //       this.state.res.forEach((item) => {
    //         console.log(item.name);
    //       });
    //     } else {
    //       console.log('Post error in restaurant events!');
    //     }
    //   });
  }

  cancel = (e) => {
    console.log(e.currentTarget.id);
    const val = e.currentTarget.id;
    const data = {
      items: val,
    };
    axios.post('http://localhost:3001/customer/cancelorder', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log('Post success in cancel order!');
        } else {
          console.log('Post error in cancel order!');
        }
      });
  }

  handleFilter = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const val = e.currentTarget.value;
    console.log(val);
    const data = {
      cName: name,
      filter: val,
    };
    axios.post('http://localhost:3001/filtcustomerorder', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.setState({
            res: response.data,
          });
          console.log('Post success in restaurant orders!');
        } else {
          console.log('Post error in restaurant orders!');
        }
      });
  }

  displayOrders() {
    const { data } = this.props;
    if (data.loading) {
      return (<div>Loading menu...</div>);
    }
    return data.customerOrders.map((item) => (
      <tr>
        <td>
          {item.items}
        </td>
        <td>
          {item.real_datetime}
        </td>
        <td>
          {item.order_option}
        </td>
        <td>
          <button id={item.items} type="submit" onClick={this.cancel} style={{ backgroundColor: 'red' }}>Cancel Order</button>
        </td>
      </tr>
    ));
  }

  render() {
    const contents = this.state.res.map((item) => (
      <tr>
        <td>
          {item.items}
        </td>
        <td>
          {item.real_datetime}
        </td>
        <td>
          {item.order_option}
        </td>
        <td>
          <button id={item.items} type="submit" onClick={this.cancel} style={{ backgroundColor: 'red' }}>Cancel Order</button>
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
            View Orders
          </h4>
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>
          <label htmlFor="filterorders">
            Filter Orders:
            <select onChange={this.handleFilter}>
              <option value="Order Recieved">Order Recieved</option>
              <option value="Preparing">Preparing</option>
              <option value="On the Way">On the Way</option>
              <option value="Delivered">Delivered</option>
              <option value="Pick Up Ready">Pick Up Ready</option>
              <option value="Picked Up">Picked Up</option>
            </select>
          </label>
          <label htmlFor="filterorders">
            Filter Time:
            <select onChange={this.handleFilter}>
              <option value="Order Recieved">Ascending</option>
              <option value="Preparing">Descending</option>
            </select>
          </label>
          <table style={{
            backgroundColor: '#D2691E', color: 'white', position: 'relative', left: '450px',
          }}
          >
            <th>Item</th>
            <th>Date</th>
            <th>Status</th>
            <th>Cancel</th>
            { this.displayOrders() }
          </table>
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
});

export default compose(
  connect(mapStateToProps),
  graphql(orders, {
    options: (props) => ({ variables: { name: props.name } }),
  }),
  graphql(customerOrders, {
    options: (props) => ({ variables: { name: props.name } }),
  }),
)(CustomerOrders);
