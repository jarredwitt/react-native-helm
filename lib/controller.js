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
    tabComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    onNavigation: () => true,
    tabComponent: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      navigationState: fromJS(props.initialNavigationState),
    };
    this.navigationMethods = createNavigationMethods(this._handleNavigationAction);
  }
  _handleNavigationAction = (action) => {
    const state = reducer(this.state.navigationState, action);
    this.setState({
      navigationState: state,
    });
  };
  render() {
    const navigationState = this.state.navigationState.toJS();
    const tabComponent = React.cloneElement(this.props.tabComponent, { activeRoot: navigationState.activeRoot, navigation: this.navigationMethods });

    const currentRouteStack = navigationState[navigationState.activeRoot];

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

          return (
            <View key={index} style={style}>
              <Renderer active={root.key === navigationState.activeRoot} rootKey={root.key} navigationState={currentRouteStack} navigation={this.navigationMethods} />
            </View>
          );
        })}
        {tabComponent}
        <Modal show={navigationState.isModal} frozen={!navigationState.isModal} navState={navigationState.modal}>
          <Renderer modal frozen={!navigationState.isModal} navigationState={currentRouteStack} navigation={this.navigationMethods} />
        </Modal>
      </View>
    );
  }
}

export default Controller;
