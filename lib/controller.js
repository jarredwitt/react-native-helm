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

    return (
      <View style={{ flex: 1 }}>
        <Renderer frozen={navigationState.isModal} navigationState={navigationState} navigation={this.navigationMethods} />
        {tabComponent}
        <Modal show={navigationState.isModal} frozen={!navigationState.isModal} navState={navigationState.modal}>
          <Renderer modal frozen={!navigationState.isModal} navigationState={navigationState} navigation={this.navigationMethods} />
        </Modal>
      </View>
    );
  }
}

export default Controller;
