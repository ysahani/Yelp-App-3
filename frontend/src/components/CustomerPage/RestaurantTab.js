import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import { menu } from '../../queries/queries';
import { placeOrder } from '../../mutations/mutations';

class RestaurantTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rName: this.props.rName,
      res: [],
      orderArr: [],
      option: 'Delivery',
    };
  }

  componentDidMount() {
    console.log(this.props.data.menu);
    const { rName } = this.state;
    const data = {
      rname: rName,
    };
    // axios.post('http://localhost:3001/restaurant/menu', data)
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

  click = (e) => {
    e.preventDefault();
    const arr = [...this.state.orderArr];
    arr.push(e.currentTarget.id);
    this.setState({ orderArr: arr });
    // console.log(this.state.orderArr);
  }

  order = (e) => {
    e.preventDefault();
    const { option } = this.state;
    const arr = [...this.state.orderArr];
    const fullOrder = arr.join(',');

    const date = new Date();
    const dateVal = `${date.getUTCFullYear()}-${
      (`0${date.getUTCMonth() + 1}`).slice(-2)}-${
      (`0${date.getUTCDate()}`).slice(-2)} ${
      (`0${date.getUTCHours()}`).slice(-2)}:${
      (`0${date.getUTCMinutes()}`).slice(-2)}:${
      (`0${date.getUTCSeconds()}`).slice(-2)}`;
    
    const datetime = `${date.getUTCMonth()}/${date.getUTCDay()}/${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;

    const data = {
      items: fullOrder,
      cName: this.props.name,
      rName: this.props.rName,
      date_time: dateVal,
      delivery_option: option,
      real_datetime: datetime,
    };

    // axios.post('http://localhost:3001/customer/placeorder', data)
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     if (response.status === 200) {
    //       // console.log(response.data);
    //       this.props.history.push('/customerorders');
    //     } else {
    //       console.log('Post error in placeorder!');
    //     }
    //   });

    this.props.placeOrder({
      variables: {
        cname: data.cName,
        items: data.items,
        r_name: data.rName,
        date_time: data.date_time,
        delivery_option: data.delivery_option,
        real_datetime: data.real_datetime,
      },
    }).then((res) => {
      this.props.history.push('/customerorders');
      console.log(res.data.placeOrder);
    });
  }

  handleChange = (e) => {
    this.setState({
      option: e.target.value,
    });
  }

  displayMenu() {
    const data = this.props.data;
    console.log(data.menu);
    if (data.loading) {
      return (<div>Loading menu...</div>);
    }
    return data.menu.map((item) => (
      <div>
        <p>
          {item.dish_name}
          /
          {item.price}
        </p>
        <button type="submit" id={item.dish_name} onClick={this.click}>Add to Cart</button>
      </div>
    ));
  }

  render() {
    const { option } = this.state;
    const { orderArr } = this.state;
    const order = orderArr.join(',');
    // const contents = this.state.res.map((item) => (
    //   <div>
    //     <p>
    //       {item.dish_name}
    //       /
    //       {item.price}
    //     </p>
    //     <button type="submit" id={item.dish_name} onClick={this.click}>Add to Cart</button>
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
          <br />
          <h4>
            Place Order
          </h4>
          <br />
        </div>
        <div style={{ position: 'relative', left: '400px' }}>
          {this.displayMenu()}
        </div>
        <div style={{ position: 'relative', left: '770px', bottom: '150px' }}>
          <p>
            Your Order:
            {' '}
            {order}
          </p>
          <select id="option" onChange={this.handleChange} value={option}>
            <option value="Delivery">Delivery</option>
            <option value="Pickup">Pickup</option>
          </select>
          <button type="submit" onClick={this.order} style={{ backgroundColor: '#d32323', color: 'white', marginLeft:'1px' }}>Complete Order</button>
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
  graphql(placeOrder, { name: 'placeOrder' }),
  graphql(menu, {
    options: (props) => ({ variables: { name: props.rName } }),
  }),
)(RestaurantTab);
