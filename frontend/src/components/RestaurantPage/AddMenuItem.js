import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import { addMenuItem } from '../../mutations/mutations';

class AddMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: '',
      price: '',
      description: '',
      category: 'Appetizer',
    };
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleIngredients = (e) => {
    this.setState({
      ingredients: e.target.value,
    });
  }

  handlePrice = (e) => {
    this.setState({
      price: e.target.value,
    });
  }

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  }

  handleCategory = (e) => {
    this.setState({
      category: e.target.value,
    });
  }

  submitForm = (e) => {
    const { name } = this.state;
    const { ingredients } = this.state;
    const { price } = this.state;
    const { description } = this.state;
    const { category } = this.state;
    const data = {
      rname: this.props.rname,
      mname: name,
      mingredients: ingredients,
      mprice: price,
      mdescription: description,
      mcategory: category,
    };

    e.preventDefault();
    // axios.post('http://localhost:3001/restaurant/addmenuitem', data)
    //   .then((response) => {
    //     console.log('Status Code : ', response.status);
    //     if (response.status === 200) {
    //       this.props.history.push('/menu');
    //     } else {
    //       console.log('error in add menu item');
    //     }
    //   });

    this.props.addMenuItem({
      variables: {
        name: data.rname,
        dish_name: data.mname,
        ingredients: data.mingredients,
        price: data.mprice,
        category: data.mcategory,
        description: data.mcategory,
      },
    }).then((res) => {
      console.log(res);
      // if (res.data.addMenuItem.status === '200') {
      this.props.history.push('/menu');
      // } else {
      //   console.log('fail added menu item');
      // }
    });
  }

  render() {
    const { category } = this.state;

    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <form className="yform">
            <label htmlFor="form-text">Name</label>
            <span className="help-block">Name of Dish</span>
            <input id="form-text" name="form-text" type="text" onChange={this.handleName} />
            <br />
            <br />
            <label htmlFor="form-text">Ingredients</label>
            <span className="help-block">Main Ingredients of Dish</span>
            <input id="form-text" name="form-text" type="text" onChange={this.handleIngredients} />
            <br />
            <br />
            <label htmlFor="form-text">Price</label>
            <span className="help-block">Dish Price</span>
            <input id="form-text" name="form-text" type="text" onChange={this.handlePrice} />
            <br />
            <br />
            <label htmlFor="form-text">Description</label>
            <span className="help-block">Description of Dish</span>
            <input id="form-text" name="form-text" type="text" onChange={this.handleDescription} />
            <br />
            <br />
            <label htmlFor="form-text">Category</label>
            <span className="help-block">Category of Dish</span>
            <select id="persona" onChange={this.handleCategory} value={category}>
              <option value="Appetizer">Appetizer</option>
              <option value="Salads">Salads</option>
              <option value="Main Course">Main Course</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
            </select>
            <br />
            <br />
            <button onClick={this.submitForm} type="submit">Update</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rname: state.name,
});

export default compose(
  graphql(addMenuItem, { name: 'addMenuItem' }),
  connect(mapStateToProps),
)(AddMenuItem);
