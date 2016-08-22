import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './tabBar.style';

class TabBar extends Component {
  static propTypes = {
    activeKey: PropTypes.string,
    navigation: PropTypes.object,
    tabs: PropTypes.array,
  };

  _handleTabSelect = (key) => this.props.navigation.switch(key);
  render() {
    const tabs = [{
      key: 'home',
      title: 'Home',
    }, {
      key: 'page',
      title: 'Page',
    }];

    return (
      <View style={styles.tabBar}>
        {tabs.map((child, index) => {
          let onSelect = () => this._handleTabSelect(child.key);
          return (
            <TouchableOpacity key={index} style={styles.tab} onPress={onSelect}>
              <Text>{child.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default TabBar;
