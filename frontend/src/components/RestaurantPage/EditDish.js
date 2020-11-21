import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import { connect } from 'react-redux';
import axios from 'axios';

class EditDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dish_name: '',
      ingredients: '',
      price: '',
      category: '',
      description: '',
      pictures: [],
    };
    this.onDrop = this.onDrop.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
  }

  componentDidMount() {
    const data = {
      restaurant_name: this.props.rname,
      dish_name: this.props.dish_name,
    };
    axios.post('http://localhost:3001/restaurant/editdish', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response);
          this.setState({
            dish_name: response.data[0].dish_name,
            ingredients: response.data[0].ingredients,
            price: response.data[0].price,
            category: response.data[0].category,
            description: response.data[0].description,
          });
          console.log('Post success in edit dish!');
        } else {
          console.log('Post error in edit dish!');
        }
      });
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  handleDishname = (e) => {
    this.setState({
      dish_name: e.target.value,
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

  handleCategory = (e) => {
    this.setState({
      category: e.target.value,
    });
  }

  handleDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { dish_name } = this.state;
    const { ingredients } = this.state;
    const { price } = this.state;
    const { category } = this.state;
    const { description } = this.state;
    const data = {
      dname: dish_name,
      ing: ingredients,
      prce: price,
      cat: category,
      desc: description,
    };
    axios.post('http://localhost:3001/restaurant/updatedish', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.props.history.push('/menu');
        } else {
          console.log('Post error in update dish!');
        }
      });
  }

  uploadImages() {
    const { dish_name } = this.state;
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
      dish_namez: dish_name,
      url: this.props.url,
    };
    console.log(data.dish_namez);
    axios.post('http://localhost:3001/images/dishurl', data)
      .then((response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          console.log(response.data);
          console.log('Post success in dishurl!');
        } else {
          console.log('Post error in dishur;!');
        }
      });
  }

  render() {
    const { dish_name } = this.state;
    const { ingredients } = this.state;
    const { price } = this.state;
    const { category } = this.state;
    const { description } = this.state;
    return (
      <div>
        <div style={{ textAlign: 'center', position: 'relative', top: '50px' }}>
          <form className="yform">
            <label htmlFor="form-text">Dish Name</label>
            <span className="help-block">Name of Dish</span>
            <input id="form-text" name="form-text" type="text" defaultValue={dish_name} onChange={this.handleDishname} />
            <br />
            <br />
            <label htmlFor="form-text">Ingredients</label>
            <span className="help-block">Ingredients of Dish</span>
            <input id="form-text" name="form-text" type="text" defaultValue={ingredients} onChange={this.handleIngredients} />
            <br />
            <br />
            <label htmlFor="form-text">Price</label>
            <span className="help-block">$ Price</span>
            <input id="form-text" name="form-text" type="text" defaultValue={price} onChange={this.handlePrice} />
            <br />
            <br />
            <label htmlFor="form-text">Category</label>
            <span className="help-block">Appetizer, Main Course, Etc.</span>
            <input id="form-text" name="form-text" type="text" defaultValue={category} onChange={this.handleCategory} />
            <br />
            <br />
            <label htmlFor="form-text">Description</label>
            <span className="help-block">Description of Dish</span>
            <input id="form-text" name="form-text" type="text" defaultValue={description} onChange={this.handleDescription} />
            <br />
            <br />
            <button onClick={this.submitForm} type="submit">Save</button>
          </form>
        </div>
        <div>
          <img style={{ position: 'relative', bottom: '500px', left: '20px' }} src="" alt="" />
          <ImageUploader
            withPreview
            withIcon
            buttonText="Choose images"
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png']}
            maxFileSize={5242880}
            style={{ position: 'relative', bottom: '300px', width: '400px' }}
          />
          <button style={{ position: 'relative', bottom: '310px', left: '145px' }} onClick={this.uploadImages}>Upload Image</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rname: state.name,
  location: state.location,
  email: state.email,
  description: state.description,
  timings: state.timings,
  dish_name: state.dName,
  url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
  updateURL: (url) => {
    dispatch({
      type: 'UPDATE_URL', aurl: url,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDish);
