import React, { Component } from 'react';

import { Navigation, Router, Scene } from '../../lib';

import Home from './home';
import Page from './page';
import DrawerMenu from './drawerMenu/drawerMenu';

const navigation = (
  <Navigation leftDrawerComponent={DrawerMenu} rightDrawerComponent={DrawerMenu}>
    <Scene root key="home" component={Home} />
    <Scene root key="page" component={Page} />
  </Navigation>
);

class Root extends Component {
  render() {
    return (
      <Router navigation={navigation} />
    );
  }
}

export default Root;
