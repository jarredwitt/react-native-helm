import React, { Component, PropTypes } from 'react';
import { NavigationExperimental, View } from 'react-native';

import HeaderStack from './headerStack';

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
    frozen: PropTypes.bool,
    modal: PropTypes.bool,
    navigation: PropTypes.object,
    navigationState: PropTypes.shape({
      roots: NavigationPropTypes.navigationState,
    }),
  };

  shouldComponentUpdate(nextProps) {
    return !nextProps.frozen;
  }
  _renderScene = (navigationState) => {
    const { SceneComponent, sceneProps } = selectNavigationScene(navigationState);

    return <SceneComponent {...sceneProps} navigation={this.props.navigation} />;
  };
  render() {
    const { navigationState } = this.props;
    const roots = navigationState.roots;
    const rootKey = this.props.modal ? 'modal' : roots.routes[roots.index].key;
    const scenes = navigationState[rootKey];

    if (rootKey === 'modal' && !navigationState.modal.routes.length) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <NavigationCardStack
          key={`root_${rootKey}`}
          navigationState={scenes}
          renderScene={this._renderScene}
        />
        <HeaderStack modal={this.props.modal} navigation={this.props.navigation} navigationState={scenes} />
      </View>
    );
  }
}

export default Renderer;
