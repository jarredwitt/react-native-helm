import React, { Component, PropTypes } from 'react';
import { NavigationExperimental } from 'react-native';

const {
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
} = NavigationExperimental;

class Header extends Component {
  static propTypes = {
    back: PropTypes.func,
    navigation: PropTypes.object,
    ...NavigationPropTypes.SceneRendererProps,
  };

  _renderTitleComponent = () => {
    const title = this.props.sceneProps.title || '';
    return (
      <NavigationHeader.Title>
        {title}
      </NavigationHeader.Title>
    );
  }
  _back = () => this.props.back();
  render() {
    return (
      <NavigationHeader
        {...this.props}
        renderTitleComponent={this._renderTitleComponent}
        onNavigateBack={this._back}
      />
    );
  }
}

export default Header;
