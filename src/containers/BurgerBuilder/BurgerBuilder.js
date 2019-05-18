import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/Actions';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
  state = {

    purchasing: false,
    // loading: false,
    // error: false
  }


  componentDidMount = () => {


    this.props.onInitIgredients()

    // axios.get('https://layered-app.firebaseio.com/ingredients.json')
    //   .then(res => {

    //     this.setState({
    //       ingredients: res.data
    //     })
    //   })
    //   .catch(err => {
    //     this.setState({
    //       error: true
    //     })
    //     console.log(err);

    //   })

  }


  updatePurchaseState = (ingredients) => {


    const sum = Object.keys(ingredients)

      .map((igKey) => {

        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0

  }


  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
    console.log(this.props);

  }
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');


  }


  render() {

    const disabledInfo = {
      ...this.props.ingrs
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] <= 0);
    }

    let orderSummary = null;


    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (this.props.ingrs) {

      burger = (
        <Aux>
          <Burger ingredients={this.props.ingrs} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ingrs)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )
      orderSummary = (
        < OrderSummary ingredients={this.props.ingrs}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.props.price}
        />
      )
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />
    // }



    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}

      </Aux >

    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingrs: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIgredients: () => dispatch(actions.initIgredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
