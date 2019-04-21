import React, { Component } from 'react'
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  sideDrawerToggleHandler = () => {

    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    //console.log(this.state.showSideDrawer);

    return (
      <Aux>
        <div >Toolbar, SideDrawer, BackDrop</div>
        <SideDrawer
          opened={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}

        />
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    )
  }

}

export default Layout;
