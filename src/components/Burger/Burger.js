// Wrapper around all ingredients
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  let transIngredients = Object.keys(props.ingredients)
    .map((ingrKey) => {
      return [...Array(props.ingredients[ingrKey])].map((_, i) => {
        return <BurgerIngredient
          key={ingrKey + i}
          type={ingrKey}

        />
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);
  // console.log(transIngredients);
  if (transIngredients.length === 0) {
    transIngredients = <p>Please start adding ingredients</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default Burger;
