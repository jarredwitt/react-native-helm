import React, { Component, PropTypes } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

class Page extends Component {
  static propTypes = {
    data: PropTypes.string,
    navigation: PropTypes.object,
  };

  static navigationProps = {
    title: 'Page',
    renderBackButton: (navigation, prevProps) => (
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>{`Back ${prevProps.title}`}</Text>
      </TouchableOpacity>
    ),
  };

  _pop = () => this.props.navigation.pop();
  _push = () => this.props.navigation.push('home');
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ marginBottom: 10 }}>A pushed page</Text>
          <Text style={{ marginBottom: 10 }}>{this.props.data}</Text>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={this._pop}>
            <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
              <Text style={{ padding: 20 }}>Pop Page</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={this._push}>
            <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
              <Text style={{ padding: 20 }}>Push Page</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}


export default Page;
