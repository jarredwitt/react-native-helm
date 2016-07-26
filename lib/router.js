import React, { Component, PropTypes } from 'react';

import Controller from './controller';

class Router extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { children: scenes, ...navigationProps } = props.navigation.props;
    this.navigationProps = navigationProps;
    const sceneMap = this._buildSceneMap(scenes);
    this.navigationState = this._buildInitialNavigationState(sceneMap);
  }
  _buildSceneMap = (scenes) => {
    const sceneMap = {};
    scenes.filter(scene => scene.props.type === 'SCENE').forEach(scene => {
      if (sceneMap[scene.key]) {
        console.error(`Duplicate scene entry for ${scene.key}. Keys must be unique.`); // eslint-disable-line
      }

      const sceneNavigationProps = scene.props.component.navigationProps || {};
      sceneMap[scene.key] = Object.assign({}, scene.props, sceneNavigationProps, {
        key: scene.key,
      });
    });

    return sceneMap;
  }
  _buildInitialNavigationState = (sceneMap) => {
    const navState = {
      roots: {
        index: 0,
        routes: [],
      },
      scenes: sceneMap,
    };

    Object.keys(sceneMap).forEach(scene => {
      if (sceneMap[scene].root) {
        navState.roots.routes.push({
          key: scene,
        });
        navState[scene] = {
          index: 0,
          routes: [
            sceneMap[scene],
          ],
        };
      }
    });

    if (!navState.roots.routes.length) {
      const initialRootScene = sceneMap[Object.keys(sceneMap)[0]];
      navState.roots.routes.push({
        key: initialRootScene.key,
        props: initialRootScene,
      });
      navState[initialRootScene.key] = {
        index: 0,
        routes: [{
          key: initialRootScene.key,
          props: initialRootScene,
        }],
      };
    }

    return Object.assign({}, navState);
  }
  render() {
    return <Controller initialNavigationState={this.navigationState} {...this.navigationProps} />;
  }
}

export default Router;
