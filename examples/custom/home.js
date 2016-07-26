import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

class Home extends Component {
  static navigationProps = {
    title: 'Home',
  };

  _push = () => this.props.navigation.push('page', { data: 'pushed from home' });
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}>Home Page</Text>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={this._push}>
          <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
            <Text style={{ padding: 20 }}>Push Page</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
            <Text style={{ padding: 20 }}>Horizontal Modal</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home
