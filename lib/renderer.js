import React, { Component, PropTypes } from 'react';
import { NavigationExperimental, View } from 'react-native';

import Header from './header';

const {
  CardStack: NavigationCardStack,
  PropTypes: NavigationPropTypes,
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
    navigation: PropTypes.object,
    navigationState: PropTypes.shape({
      roots: NavigationPropTypes.navigationState,
    }),
  };

  _renderHeader = (navigationState) => {
    const { sceneProps } = selectNavigationScene(navigationState);
    return <Header {...navigationState} back={this.props.navigation.pop} sceneProps={sceneProps} />;
  };
  _renderScene = (navigationState) => {
    const { SceneComponent, sceneProps } = selectNavigationScene(navigationState);

    return <SceneComponent {...sceneProps} navigation={this.props.navigation} />;
  };
  render() {
    const { navigationState } = this.props;
    const roots = navigationState.roots;
    const rootKey = roots.routes[roots.index].key;
    const scenes = navigationState[rootKey];

    return (
      <View style={{ flex: 1 }}>
        <NavigationCardStack
          key={`root_${rootKey}`}
          navigationState={scenes}
          onNavigationBack={this.props.navigation.pop}
          renderOverlay={this._renderHeader}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}

export default Renderer;
