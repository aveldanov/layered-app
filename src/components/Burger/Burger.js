// Wrapper around all ingredients
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  const transIngredients = Object.keys(props.ingredients)
    .map((ingrKey) => {
      return [...Array(props.ingredients[ingrKey])].map((_, i) => {
        return <BurgerIngredient
          key={ingrKey + i}
          type={ingrKey}

        />
      })

    });
  console.log(transIngredients);


  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transIngredients}
      <BurgerIngredient type="bread-bottom" />

    </div>
  )
}

export default Burger;
