import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        link="/"
      >
        Burger Builder
      </NavigationItem>
      <NavigationItem
        link="/orders"
      >
        Order
      </NavigationItem>

      {!props.isAuthenticated ?
        <NavigationItem
          link="/auth"
        >
          Authenticate
      </NavigationItem> : <NavigationItem
          link="/logout"
        >
          Logout
      </NavigationItem>}
    </ul>
  )
}

export default NavigationItems
