import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import { orders, filterOrders } from '../../queries/queries';
import { updateOrder } from '../../mutations/mutations';

class RestaurantOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      res: [],
      option: '',
    };
  }

  componentDidMount() {
    const { name } = this.state;
    const data = {
      rName: name,
    };

    axios.post('http://localhost:3001/restaurant/restaurantorders', data)
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
          console.log('Post error in restaurant orders!');
        }
      });
  }

  handleChange = (e) => {
    e.preventDefault();
    const val = e.currentTarget.value;
    const item = e.currentTarget.id;
    // console.log(val);
    // console.log(item);
    this.setState({
      option: val,
    });
    const { option } = this.state;
    console.log(val);
    const data = {
      order_option: val,
      items: item,
    };
    this.props.updateOrder({
      variables: {
        order_option: data.order_option,
        items: data.items,
      },
    }).then((res) => {
      console.log(res);
    });
    // this.props.data.filterOrders;
    // axios.post('http://localhost:3001/restaurant/updateorder', data)
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     if (response.status === 200) {
    //       console.log('Post success in restaurant orders!');
    //     } else {
    //       console.log('Post error in restaurant orders!');
    //     }
    //   });
  }

  clickLin = (e) => {
    this.props.updateCname(e.currentTarget.textContent);
  }

  handleFilter = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const val = e.currentTarget.value;
    console.log(val);
    const data = {
      rName: name,
      filter: val,
    };
    // axios.post('http://localhost:3001/restaurant/filterorder', data)
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     if (response.status === 200) {
    //       this.setState({
    //         res: response.data,
    //       });
    //       console.log('Post success in restaurant orders!');
    //     } else {
    //       console.log('Post error in restaurant orders!');
    //     }
    //   });
  }

  displayOrders() {
    const data = this.props.data;
    console.log('this.props');
    console.log(this.props);
    if (data.loading) {
      return (<div>Loading orders...</div>);
    }

    const showItems = (aption, name, option) => {
      if (aption === 'Delivery' && option === 'Order Recieved') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved" selected>Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      } if (aption === 'Delivery' && option === 'Preparing') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing" selected>Preparing</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      } if (aption === 'Delivery' && option === 'On the Way') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="On the Way" selected>On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      } if (aption === 'Delivery' && option === 'Delivered') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered" selected>Delivered</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Order Recieved') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Preparing') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing" selected>Preparing</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Pick Up Ready') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="Pick Up Ready" selected>Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Picked Up') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up" selected>Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Cancel') {
        return (
          <p>Cancelled</p>
        );
      } if (aption === 'Delivery' && option === 'Cancel') {
        return (
          <p>Cancelled</p>
        );
      }
    };
    console.log(data.orders);
    return data.orders.map((item) => (
      <tr>
        <td>
          <Link to="/viewcustomer" onClick={this.clickLin}>{item.cName}</Link>
        </td>
        <td>
          {item.real_datetime}
        </td>
        <td>
          {item.items}
        </td>
        <td id={item.items}>
          {showItems(item.delivery_option, item.items, item.order_option)}
        </td>
      </tr>
    ));
  }

  render() {
    const showItems = (aption, name, option) => {
      if (aption === 'Delivery' && option === 'Order Recieved') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved" selected>Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      } if (aption === 'Delivery' && option === 'Preparing') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing" selected>Preparing</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      } if (aption === 'Delivery' && option === 'On the Way') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="On the Way" selected>On the Way</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      } if (aption === 'Delivery' && option === 'Delivered') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="On the Way">On the Way</option>
            <option value="Delivered" selected>Delivered</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Order Recieved') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Preparing') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing" selected>Preparing</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Pick Up Ready') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="Pick Up Ready" selected>Pick Up Ready</option>
            <option value="Picked Up">Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Picked Up') {
        return (
          <select id={name} name={name} onChange={this.handleChange}>
            <option value="Order Recieved">Order Recieved</option>
            <option value="Preparing">Preparing</option>
            <option value="Pick Up Ready">Pick Up Ready</option>
            <option value="Picked Up" selected>Picked Up</option>
          </select>
        );
      } if (aption === 'Pickup' && option === 'Cancel') {
        return (
          <p>Cancelled</p>
        );
      } if (aption === 'Delivery' && option === 'Cancel') {
        return (
          <p>Cancelled</p>
        );
      }
    };

    const contents = this.state.res.map((item) => (
      <tr>
        <td>
          <Link to="/viewcustomer" onClick={this.clickLin}>{item.cName}</Link>
        </td>
        <td>
          {item.real_datetime}
        </td>
        <td>
          {item.items}
        </td>
        <td id={item.items}>
          {showItems(item.delivery_option, item.items, item.order_option)}
        </td>
      </tr>
    ));
    return (
      <div>
        <div id="header">
          <h1>{this.props.name}</h1>
          <h2>{this.props.location}</h2>
          <hr id="line" />
        </div>
        <div id="events">
          <h4>
            Orders
          </h4>
          <br />
        </div>
        <div style={{ textAlign: 'center' }}>
          <label htmlFor="filterorders">
            Filter Orders:
            <select onChange={this.handleFilter}>
              <option value="All Orders">All Orders</option>
              <option value="New Orders">New Orders</option>
              <option value="Delivered Orders">Delivered Orders</option>
              <option value="Cancelled Orders">Cancelled Orders</option>
            </select>
          </label>
          <table style={{ position: 'relative', left: '450px' }}>
            { this.displayOrders() }
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.name,
  location: state.location,
});

const mapDispatchToProps = (dispatch) => ({
  updateCname: (cnam) => {
    dispatch({
      type: 'UPDATE_CNAME', cName: cnam,
    });
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(updateOrder, { name: 'updateOrder' }),
  graphql(orders, {
    options: (props) => ({ variables: { name: props.name } }),
  }),
  // graphql(filterOrders, {
  //   options: (state) => ({ variables: { order_option: state.option } }),
  // }),
)(RestaurantOrders);
