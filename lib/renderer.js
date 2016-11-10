import React, { Component, PropTypes } from 'react';
import { NavigationExperimental, View } from 'react-native';

import Header from './header';

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

function selectNavigationScene(navigationState) {
  const { component: SceneComponent, ...sceneProps } = navigationState.scene.route;

  return {
    SceneComponent,
    sceneProps,
  };
}

class Renderer extends Component {
  static propTypes = {
    active: PropTypes.bool,
    modal: PropTypes.bool,
    navigation: PropTypes.object,
    navigationState: PropTypes.object,
    rootKey: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.active;
  }
  _renderScene = (navigationState) => {
    const { SceneComponent, sceneProps } = selectNavigationScene(navigationState);

    if (!SceneComponent) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <SceneComponent {...sceneProps} navigation={this.props.navigation} />
        <Header navigation={this.props.navigation} sceneProps={sceneProps} />
      </View>
    );
  };
  render() {
    if (!this.props.navigationState.routes.length) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <NavigationCardStack
          key={`root_${this.props.rootKey}`}
          navigationState={this.props.navigationState}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}

export default Renderer;
