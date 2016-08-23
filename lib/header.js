import React, { Component, PropTypes } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  leftButtonContainer: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButtonWrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightButtonContainer: {
    flex: 1,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButtonWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'avenir next',
    fontSize: 18,
    color: '#3b3a3a',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 64,
    width,
  },
});

const defaultBackButton = (navigation, previousSceneProps) => (
  <TouchableOpacity onPress={() => navigation.pop()}>
    <Text>{previousSceneProps.title}</Text>
  </TouchableOpacity>
);

class Header extends Component {
  static propTypes = {
    back: PropTypes.func,
    canPop: PropTypes.func,
    navigation: PropTypes.object,
    previousSceneProps: PropTypes.object,
    sceneProps: PropTypes.object,
  };

  static defaultProps = {
    sceneProps: {},
  };

  render() {
    if (this.props.sceneProps.hideNavBar) {
      return null;
    }

    const backButton = this.props.sceneProps.renderBackButton || defaultBackButton;

    return (
      <View style={[styles.wrapper, this.props.sceneProps.headerContainerStyle]}>
        <View style={styles.container}>
          <View style={styles.leftButtonContainer}>
            {this.props.previousSceneProps ?
              <View style={styles.leftButtonWrapper}>
                {backButton(this.props.navigation, this.props.previousSceneProps)}
              </View>
              :
              this.props.sceneProps.leftButtons && this.props.sceneProps.leftButtons.map((renderer, index) => (
                <View key={index} style={styles.leftButtonWrapper}>
                  {renderer(this.props.navigation)}
                </View>
              ))
            }
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, this.props.sceneProps.headerTitleStyle]}>{this.props.sceneProps.title}</Text>
          </View>
          <View style={styles.rightButtonContainer}>
            {this.props.sceneProps.rightButtons && this.props.sceneProps.rightButtons.map((renderer, index) => (
              <View key={index} style={styles.rightButtonWrapper}>
                {renderer(this.props.navigation)}
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default Header;
