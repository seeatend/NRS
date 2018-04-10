import { Platform, Image, View, TextInput } from 'react-native';
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Metrics, Styles, Images, Colors } from '@theme/';

export default class SearchBox extends Component {
  static propTypes = {
    "setText" : React.PropTypes.func.isRequired
  }
  render() {
    return (
      <View style={{ flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'center' }}>
        <Icon
          style={{ margin: 5, fontSize: 15 }}
          containerStyle={Styles.center}
          color={Colors.textPrimary}
          name={'search'}
          size={Metrics.screenHeight / 30}
        />
        <TextInput
          style={{ margin: 5, height: 30, width: Metrics.screenWidth * 0.8, borderBottomWidth: 1, borderColor: 'black' }}
          onChangeText={(text) => this.props.setText(text)}
          placeholder="Search"
        />
        <Image source={Images.ic_barcode_scan}
          style={{ width: 30, height: 30 }}
        />
      </View>
    )
  }
}
