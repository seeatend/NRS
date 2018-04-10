import { Platform, TextInput, Image, findNodeHandle, View, ListView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Container, Content, Card, CardItem, Left, Right, Body, Thumbnail, Text, Button } from 'native-base';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome';
import SudokuGrid from 'react-native-smart-sudoku-grid';

import { replaceRoute, pushNewRoute, popRoute } from '@actions/route';
import { setDetail } from '@actions/globals';

import { Metrics, Styles, Images, Colors } from '@theme/';
import styles from './styles';

import homeData from '../../dummy/homeData.json';
import Global from '@src/Global';
const dataList = ['cash', 'credit', 'transfer', 'ddd','dd', 'cash', 'credit', 'transfer', 'ddd','dd'];

class Store extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      viewRef: 0,
    };
  }

  replaceRoute(route) {
    this.props.replaceRoute(route);
  }
  pushNewRoute(route) {
    this.props.pushNewRoute(route);
  }
  gotoDetail(item) {
    Global.detailData = item;
    this.props.setDetail(true);
  }
  _renderGridCell = data => (
    <TouchableOpacity onPress={() => this.pushNewRoute('product')}>
    <View style={{width: Metrics.screenWidth * 0.95, alignSelf: 'center', marginTop: 10, height: Metrics.screenWidth * 0.45, backgroundColor: 'white', borderRadius: 10, flexDirection:'row'}}>
      <View style={{flex: 2}}>
        <Image source={Images.food1} style={{ flex: 1, width: null, height: null, margin: 10,}}/>
      </View>
            
      <View style={{flex: 3, backgroundColor: '#ffffff',  justifyContent: 'space-between'}}>
        <Text numberOfLines={2} style={{ fontSize: Metrics.screenHeight / 30}}>Steak with chimichurri</Text>
        <View style={[Styles.left, { flexDirection: 'row'}]}>
          <Icon
            style={{fontSize: 15, color: Colors.buttonPrimary, marginRight: 5,}}
            containerStyle={Styles.center}
            color={Colors.textPrimary}
            name={'shopping-cart'}/>
          <Text style={{color: Colors.buttonPrimary}}>In Store</Text>
        </View>
        <Text>17 oz</Text>
        <Text style={{ fontSize: Metrics.screenHeight / 30}}>$101.00</Text>
      </View>
      <View style={[Styles.center, {flex: 1.5, backgroundColor: Colors.brandPrimary, borderBottomRightRadius:10, borderTopRightRadius:10}]}>      
        <Icon
            style={{fontSize: 20, color: 'white', marginRight: 5,}}
            containerStyle={Styles.center}
            color={Colors.textPrimary}
            name={'shopping-cart'}/>
        <Text style={{color: 'white'}}>Add</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
  render() {
    return (
      <View style={[Styles.fullScreen, {backgroundColor:'lightgrey'}]}> 
        <View style={[styles.headerView, {backgroundColor: Colors.brandPrimary, flexDirection:'row'}]}>
          <TouchableOpacity onPress={() => this.props.popRoute()}>
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'arrow-left'}/>
          </TouchableOpacity>
          <Text style={{flex:1, color:'white', fontSize:15, marginLeft:20}}> Special offers </Text>
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'search'}/>
          <Image source={Images.ic_barcode_scan}
            style={{ width: 30, height: 30, marginLeft:20, tintColor:'white'}}
          />
          <TouchableOpacity onPress={() => this.pushNewRoute('cart')}>              
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20, marginRight:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'shopping-cart'}/>
          </TouchableOpacity>          
        </View>
        <ScrollView>
          <SudokuGrid
            columnCount={1}
            dataSource={dataList}
            renderCell={this._renderGridCell}
          />
        </ScrollView>
      </View>
    );
  }
}

Store.propTypes = {
  replaceRoute: React.PropTypes.func.isRequired,
  pushNewRoute: React.PropTypes.func.isRequired,
  setDetail: React.PropTypes.func.isRequired,
  popRoute: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    popRoute: () => dispatch(popRoute()),
    setDetail: status => dispatch(setDetail(status)),
  };
}
function mapStateToProps(state) {
  return { };
}
export default connect(mapStateToProps, mapDispatchToProps)(Store);
