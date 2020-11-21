import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import Navbar from './LandingPage/Navbar';
import LogIn from './LogIn/LogIn';
import RestaurantPage from './RestaurantPage/RestaurantPage';
import ReviewsPage from './RestaurantPage/Reviews';
import UpdateProfile from './RestaurantPage/UpdateProfile';
import Menu from './RestaurantPage/Menu';
import Customer from './CustomerPage/CustomerPage';
import UpdateCustomer from './CustomerPage/UpdateCustomer';
import RestaurantEvent from './RestaurantPage/RestaurantEvents';
import AddEvent from './RestaurantPage/AddEvent';
import CustomerEvent from './CustomerPage/CustomerEvents';
import RegisterEvent from './CustomerPage/RegisterEvent';
import RegisteredList from './RestaurantPage/RegisteredList';
import ViewCustomer from './RestaurantPage/ViewCustomer';
import AddMenuItem from './RestaurantPage/AddMenuItem';
import ViewRestaurant from './CustomerPage/ViewRestaurant';
import RestaurantProf from './CustomerPage/RestaurantProf';
import RestaurantTab from './CustomerPage/RestaurantTab';
import MakeReview from './CustomerPage/MakeReview';
import RestaurantOrders from './RestaurantPage/RestaurantOrders';
import CustomerOrders from './CustomerPage/CustomerOrders';
import EditDish from './RestaurantPage/EditDish';

// Create a Main Component
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {/* Render Different Component based on Route */}
        <Route path="/" component={Navbar} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/restaurantpage" component={RestaurantPage} />
        <Route path="/reviewspage" component={ReviewsPage} />
        <Route path="/updateprofile" component={UpdateProfile} />
        <Route path="/menu" component={Menu} />
        <Route path="/customerpage" component={Customer} />
        <Route path="/updatecustomer" component={UpdateCustomer} />
        <Route path="/restaurantevents" component={RestaurantEvent} />
        <Route path="/addevent" component={AddEvent} />
        <Route path="/customerevents" component={CustomerEvent} />
        <Route path="/registerevent" component={RegisterEvent} />
        <Route path="/registeredlist" component={RegisteredList} />
        <Route path="/viewcustomer" component={ViewCustomer} />
        <Route path="/addmenuitem" component={AddMenuItem} />
        <Route path="/viewrestaurant" component={ViewRestaurant} />
        <Route path="/restaurantprof" component={RestaurantProf} />
        <Route path="/restauranttab" component={RestaurantTab} />
        <Route path="/makereview" component={MakeReview} />
        <Route path="/restaurantorders" component={RestaurantOrders} />
        <Route path="/customerorders" component={CustomerOrders} />
        <Route path="/editdish" component={EditDish} />
      </div>
    );
  }
}
// Export The Main Component
export default Main;
