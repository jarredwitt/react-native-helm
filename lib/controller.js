import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';
import { View } from 'react-native';

import createNavigationMethods from './navigationMethods';
import reducer from './reducer';

// import Modal from './modal';
import Renderer from './renderer';

class Controller extends Component {
  static propTypes = {
    initialNavigationState: PropTypes.object,
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

    return (
      <View style={{ flex: 1 }}>
        <Renderer navigationState={navigationState} navigation={this.navigationMethods} />
      </View>
    );
  }
}

export default Controller;
