import React, { Component } from 'react';

import { Navigation, Router, Scene } from '../../lib';

import Home from './home';
import Page from './page';

const navigation = (
  <Navigation>
    <Scene root key="home" component={Home} />
    <Scene key="page" component={Page} />
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
