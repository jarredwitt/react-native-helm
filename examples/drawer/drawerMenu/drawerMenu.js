import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './drawerMenu.style';

const DrawerMenu = (side) => class extends Component {
  static propTypes = {
    activeRoot: PropTypes.string,
    navigation: PropTypes.object,
  };

  render() {
    let pushMethod;
    if (side === 'left') {
      pushMethod = () => this.props.navigation.leftDrawerPush('drawerPage', { hideNavBar: true });
    } else {
      pushMethod = () => this.props.navigation.rightDrawerPush('drawerPage');
    }

    return (
      <View style={styles.mainView}>
        <TouchableOpacity onPress={() => this.props.navigation.switch('page', { leftDrawerVisible: false })} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Page</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pushMethod} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Push Page</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default DrawerMenu;
