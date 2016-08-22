import React, { Component, PropTypes } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';

import Header from './header';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    height: 64,
    width,
    top: 0,
    left: 0,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#B2B2B2',
  },
  headerWrapper: {
    position: 'absolute',
    height: 64,
    width,
    top: 0,
    left: 0,
  },
});

class HeaderStack extends Component {
  static propTypes = {
    modal: PropTypes.bool,
    navigation: PropTypes.object,
    navigationState: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.routes = props.navigationState.routes;
    this.isFirstRender = true;
    this._buildHeaders();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.navigationState.index > this.props.navigationState.index) {
      this.routes = nextProps.navigationState.routes;
    }

    const lastIndex = this.props.navigationState.index;
    const nextIndex = nextProps.navigationState.index;

    this.isFirstRender = lastIndex === 0 && nextIndex === 0;
    this.isPush = nextIndex > lastIndex;
    this._buildHeaders(lastIndex, nextIndex);
  }
  componentDidUpdate() {
    this.routes = this.props.navigationState.routes;
  }
  _buildHeaders = (lastIndex = 0, nextIndex = 0) => {
    this.renderStack = this.routes.map((route, index) => {
      const { component: SceneComponent, ...sceneProps } = route; // eslint-disable-line

      let animationType = 'Out';
      let animationDirection = 'LeftBig';

      if (this.isPush) {
        if (nextIndex - index > 1) {
          return null;
        }

        if (index === nextIndex) {
          animationType = 'In';
          animationDirection = 'RightBig';
        }
      } else {
        if (lastIndex - index > 1) {
          return null;
        }

        animationType = 'In';

        if (index === lastIndex) {
          animationType = 'Out';
          animationDirection = 'RightBig';
        }
      }

      const animationName = this.isFirstRender ? null : `fade${animationType}${animationDirection}`;

      return (
        <AnimatedView
          key={index}
          animation={animationName}
          duration={250}
          easing="ease"
          style={styles.headerWrapper}
        >
          <Header key={index} navigation={this.props.navigation} sceneProps={sceneProps} />
        </AnimatedView>
      );
    });
  }
  render() {
    const currentRoute = this.props.navigationState.routes[this.props.navigationState.index];
console.warn('You need to rethink the header to work with tabs also idiot!!!');
    let animationName;
    if (this.isPush && currentRoute.hideNavBar) {
      animationName = 'fadeOutLeftBig';
      this.lastRouteHideNavBar = true;
    } else if (this.isPush && this.lastRouteHideNavBar && !currentRoute.hideNavBar) {
      animationName = 'fadeInRightBig';
    } else if (this.lastRouteHideNavBar && currentRoute.hideNavBar) {
      animationName = 'fadeOutRightBig';
    } else if (this.lastRouteHideNavBar && !currentRoute.hideNavBar) {
      animationName = 'fadeInLeftBig';
    } else if (this.props.modal && currentRoute.hideNavBar) {
      return null;
    }

    return (
      <AnimatedView animation={animationName} duration={250} style={[styles.headerContainer, currentRoute.headerContainerStyle]}>
        {this.renderStack}
      </AnimatedView>
    );
  }
}

export default HeaderStack;
