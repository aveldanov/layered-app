import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }
  checkoutCancelledHandler = () => {
    console.log(this.props);

    this.props.history.goBack();
  }


  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }


  componentWillMount() {
    // console.log(this.props);

    const query = new URLSearchParams(this.props.location.search);

    // console.log(query.entries());

    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //['salad','1']
      // console.log('[Checkout] param', param);
      if (param[0] === 'price') {
        price = param[1];
      } else {

        ingredients[param[0]] = +param[1];
        console.log(ingredients);
      }



    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    })
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}   {...props}

        />)} />
      </div>
    )
  }
}

export default Checkout
