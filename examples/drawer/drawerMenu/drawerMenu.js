import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './drawerMenu.style';

class DrawerMenu extends Component {
  static propTypes = {
    activeRoot: PropTypes.string,
    navigation: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.mainView}>
        <TouchableOpacity onPress={() => this.props.navigation.switch('page')} style={styles.menuItem}>
          <Text style={styles.menuItemText}>Page</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DrawerMenu;
