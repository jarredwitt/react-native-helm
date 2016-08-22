import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import { View } from 'react-native';

import createNavigationMethods from './navigationMethods';
import reducer from './reducer';

import Modal from './modal';
import Renderer from './renderer';

class Controller extends Component {
  static propTypes = {
    initialNavigationState: PropTypes.object,
    onNavigate: PropTypes.func,
    tabComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
  };

  constructor(props) {
    super(props);
    this.state = {
      navigationState: fromJS(props.initialNavigationState),
    };
    this.navigationMethods = createNavigationMethods(this._handleNavigationAction);
    this.reducer = reducer(props.onNavigate);
  }
  _handleNavigationAction = (action) => {
    const state = this.reducer(this.state.navigationState, action);
    this.setState({
      navigationState: state,
    });
  };
  render() {
    const navigationState = this.state.navigationState.toJS();
    let tabComponent;
    if (this.props.tabComponent) {
      tabComponent = React.cloneElement(this.props.tabComponent, { activeRoot: navigationState.activeRoot, navigation: this.navigationMethods });
    }

    const modalRouteStack = navigationState.modal;

    return (
      <View style={{ flex: 1 }}>
        {navigationState.roots.routes.map((root, index) => {
          let style = { };
          if (root.key !== navigationState.activeRoot) {
            style.height = 0;
            style.overflow = 'hidden';
          } else {
            style.flex = 1;
          }

          const routeStack = navigationState[navigationState.roots.routes[index].key];

          return (
            <View key={index} style={style}>
              <Renderer active={root.key === navigationState.activeRoot} rootKey={root.key} navigationState={routeStack} navigation={this.navigationMethods} />
            </View>
          );
        })}
        {tabComponent}
        <Modal show={navigationState.isModal} frozen={!navigationState.isModal} navState={navigationState.modal}>
          <Renderer active={navigationState.isModal} modal frozen={!navigationState.isModal} navigationState={modalRouteStack} navigation={this.navigationMethods} />
        </Modal>
      </View>
    );
  }
}

export default Controller;
