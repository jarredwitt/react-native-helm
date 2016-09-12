import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import { Dimensions, View } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';

import createNavigationMethods from './navigationMethods';
import reducer from './reducer';

import Modal from './modal';
import Renderer from './renderer';

const { width, height } = Dimensions.get('window');

class Controller extends Component {
  static propTypes = {
    initialNavigationState: PropTypes.object,
    leftDrawerComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    onNavigate: PropTypes.func,
    rightDrawerComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
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
  componentDidUpdate() {
    const navigationState = this.state.navigationState.toJS();

    if (this.props.leftDrawerComponent || this.props.rightDrawerComponent) {
      if (navigationState.leftDrawerVisible) {
        this.container.transitionTo({ left: 300 }, 300);
      } else if (navigationState.rightDrawerVisible) {
        this.container.transitionTo({ left: -300 }, 300);
      } else {
        this.container.transitionTo({ left: 0 }, 300);
      }
    }
  }
  _handleNavigationAction = (action) => {
    const state = this.reducer(this.state.navigationState, action);
    this.setState({
      navigationState: state,
    });
  };
  _attachContainer = (c) => {
    this.container = c;
  }
  render() {
    const navigationState = this.state.navigationState.toJS();

    let TabComponent = this.props.tabComponent;

    const modalRouteStack = navigationState.modal;
    const leftDrawerRouteStack = navigationState.leftDrawer;
    const rightDrawerRouteStack = navigationState.rightDrawer;

    return (
      <AnimatedView ref={this._attachContainer} style={{ position: 'absolute', height, width: width + 300 + 300, top: 0, left: 0 }}>
        <View style={{ position: 'absolute', height, width: 300, top: 0, left: -300 }}>
          {this.props.leftDrawerComponent && <Renderer active={navigationState.leftDrawerVisible} navigationState={leftDrawerRouteStack} navigation={this.navigationMethods} />}
        </View>
        <View style={{ width: 300, height, top: 0, right: width * -1 }}>
          {this.props.rightDrawerComponent && <Renderer active={navigationState.rightDrawerVisible} navigationState={rightDrawerRouteStack} navigation={this.navigationMethods} />}
        </View>
        <View style={{ height, width, position: 'absolute', top: 0, left: 0 }}>
          {navigationState.roots.routes.map((root, index) => {
            let style = {};
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
          {this.props.tabComponent && <TabComponent activeRoot={navigationState.activeRoot} navigation={this.navigationMethods} />}
        </View>
        <Modal show={navigationState.isModal} frozen={!navigationState.isModal} navState={navigationState.modal} backgroundColor={navigationState.modalBackgroundColor}>
          <Renderer active={navigationState.isModal} modal frozen={!navigationState.isModal} navigationState={modalRouteStack} navigation={this.navigationMethods} />
        </Modal>
      </AnimatedView>
    );
  }
}

export default Controller;
