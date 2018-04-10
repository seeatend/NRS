import { Platform, Image, View, TextInput } from 'react-native';
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Metrics, Styles, Images, Colors } from '@theme/';

export default class NavigationBarComponent extends Component {
    static propTypes = {
        "contents" : React.PropTypes.object.isRequired
    }
    render() {
        return (
            <View style={[Styles.fullScreen, { backgroundColor: 'white' }]}>
                <View style={[styles.headerView, { backgroundColor: Colors.brandPrimary, flexDirection: 'row' }]}>
                    <Icon
                        style={{ fontSize: 20, color: Colors.textSecondary, marginLeft: 20 }}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'bars'} />
                    <Text style={{ flex: 1, color: 'white', fontSize: 15, marginLeft: 20 }}> Shop</Text>
                    <Icon
                        style={{ fontSize: 20, color: Colors.textSecondary, marginLeft: 20 }}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'search'} />
                    <Image source={Images.ic_barcode_scan}
                        style={{ width: 30, height: 30, marginLeft: 20, tintColor: 'white' }}
                    />
                    <Icon
                        style={{ fontSize: 20, color: Colors.textSecondary, marginLeft: 20, marginRight: 20 }}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'shopping-cart'} />
                </View>
                </View>
                )
    }
}