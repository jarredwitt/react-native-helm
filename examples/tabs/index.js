import React, { Component } from 'react';

import { Navigation, Router, Scene, TabBar } from '../../lib';

import Home from './home';
import Page from './page';

const tabs = [{
  key: 'home',
  title: 'Home',
}, {
  key: 'page',
  title: 'Page',
}];

const tabComponent = <TabBar tabs={tabs} />;

const navigation = (
  <Navigation tabComponent={tabComponent}>
    <Scene root key="home" component={Home} />
    <Scene root key="page" component={Page} headerContainerStyle={{ backgroundColor: 'pink' }} />
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
