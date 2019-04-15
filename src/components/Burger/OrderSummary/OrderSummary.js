import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[OrderSammary] WillUpdate');

  }


  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map((igKey) => {
        return <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}> {igKey}
          </span> : {this.props.ingredients[igKey]}
        </li>

      })
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A burger with the following ingredients: </p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>
          Total price: ${this.props.totalPrice.toFixed(2)}

        </strong> </p>
        <p>Continue to check-out</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux>

    )


  }

}




export default OrderSummary;
