import React, { Component } from 'react';

import { Navigation, Router, Scene, Schema } from '../../lib';

import Home from './home';
import Page from './page';

const navigation = (
  <Navigation>
    <Schema key="default" headerTitleStyle={{ color: 'blue' }} />
    <Scene root key="home" schema="default" component={Home} />
    <Scene key="page" schema="default" component={Page} />
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
