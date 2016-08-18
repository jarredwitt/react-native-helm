import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  static navigationProps = {
    title: 'Home',
    leftButtons: [(navigation) => (
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>Pop</Text>
      </TouchableOpacity>
    )],
    rightButtons: [() => (
      <TouchableOpacity>
        <Text>Right Button</Text>
      </TouchableOpacity>
    )],
  };

  _push = () => this.props.navigation.push('page', { data: 'pushed from home' });
  _modal = () => this.props.navigation.modal('page', { data: 'modal from home', hideNavBar: true });
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}>Home Page</Text>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={this._push}>
          <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
            <Text style={{ padding: 20 }}>Push Page</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={this._modal}>
          <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
            <Text style={{ padding: 20 }}>Modal</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
