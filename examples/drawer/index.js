import React, { Component } from 'react';

import { Navigation, Router, Scene } from '../../lib';

import Home from './home';
import Page from './page';
import DrawerPage from './drawerPage';
import drawerMenu from './drawerMenu/drawerMenu';

const LeftDrawerMenu = drawerMenu('left');
const RightDrawerMenu = drawerMenu('right');

const navigation = (
  <Navigation leftDrawerComponent={LeftDrawerMenu} rightDrawerComponent={RightDrawerMenu}>
    <Scene root key="home" component={Home} />
    <Scene root key="page" component={Page} />
    <Scene root key="drawerPage" component={DrawerPage} />
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
