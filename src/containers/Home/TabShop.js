import { Platform, TextInput, Image,  findNodeHandle, View, ListView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Container, Content, Card, CardItem, Left, Right, Body, Thumbnail, Text, Button } from 'native-base';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome';

import { replaceRoute, pushNewRoute } from '@actions/route';
import { setDetail } from '@actions/globals';

import { Metrics, Styles, Images, Colors } from '@theme/';
import styles from './styles';

import homeData from '../../dummy/homeData.json';

import SudokuGrid from 'react-native-smart-sudoku-grid';


const dataList = ['cash', 'credit', 'transfer', 'ddd','dd', 'cash', 'credit', 'transfer', 'ddd','dd'];

class TabShop extends Component {
  constructor(props) {
    super(props);
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
    <View style={{padding: 5}}>
      <TouchableOpacity onPress={() => this.pushNewRoute('store')}>
        <Thumbnail style={{width: Metrics.screenWidth * 0.5 - 10, height: Metrics.screenWidth * 0.5, borderRadius: 5, padding :5}} source={Images.store1} >
          <View style={{height:40, backgroundColor:'rgba(40, 40, 40, 0.6)', position:'absolute', bottom:0, right:0, left:0, justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'white'}}>{data}</Text>
          </View>        
        </Thumbnail>
      </TouchableOpacity>
    </View>
  )
  render() {
    return (
      <View style={[Styles.fullScreen, {backgroundColor:'white'}]}>
        <View style={[styles.headerView, {backgroundColor: Colors.brandPrimary, flexDirection:'row'}]}>
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'bars'}/>
          <Text style={{flex:1, color:'white', fontSize:15, marginLeft:20}}> Shop</Text>
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
        <Content style={{backgroundColor: '#fff', flex: 1}}>
          <SudokuGrid
            columnCount={2}
            dataSource={dataList}
            renderCell={this._renderGridCell}
          />
        </Content>
      </View>
    );
  }
}

TabShop.propTypes = {
  replaceRoute: React.PropTypes.func.isRequired,
  pushNewRoute: React.PropTypes.func.isRequired,
  setDetail: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    setDetail: status => dispatch(setDetail(status)),
  };
}
function mapStateToProps(state) {
  return { };
}
export default connect(mapStateToProps, mapDispatchToProps)(TabShop);
