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

class Product extends Component {
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
  )
  render() {
    return (
      <View style={[Styles.fullScreen, {backgroundColor:'white'}]}> 
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
          {/*<Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20, marginRight:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'shopping-cart'}/>*/}
          <TouchableOpacity onPress={() => this.pushNewRoute('cart')}> 
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20, marginRight:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'shopping-cart'}/>
          </TouchableOpacity>          
        </View>
        <ScrollView>
          <View style={[Styles.center, {padding: 10}]}>
            <Text style={{ fontSize: Metrics.screenHeight / 30, margin: 10}}>Organic Blueberries</Text>
            <Image source={Images.food1} style={{ width: Metrics.screenWidth * 0.7, height: Metrics.screenWidth * 0.7, marginVertical: 5}}>
            </Image>
            <Text>15 oz</Text>
            <View style={[Styles.left, { flexDirection: 'row'}]}>
              <Icon
                style={{fontSize: 15, color: Colors.buttonPrimary, marginRight: 5,}}
                containerStyle={Styles.center}
                color={Colors.textPrimary}
                name={'shopping-cart'}/>
              <Text style={{color: Colors.buttonPrimary}}>In Store</Text>
            </View>
            <Text style={{ fontSize: Metrics.screenHeight / 40, margin: 5}}>$101.00</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
              <View style={[Styles.center, {marginRight: 10}]}>
                <Icon
                  style={{fontSize: 20, color: 'black', marginRight: 5,}}
                  containerStyle={Styles.center}
                  name={'pencil-square-o'}/>
                <Text style={{ color: 'black',}}>Add to list</Text>
              </View>
              <TouchableOpacity style={[Styles.center, {backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.7, height: 40, borderRadius: 5}]}>
                <Text style={{ fontSize: Metrics.screenHeight / 40, color: 'white'}}>ADD TO CART</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ backgroundColor: '#eeeeee'}}>
          <View style={{}}>
            <Text style={{ margin: 10, marginBottom :5, fontSize: 13}}>RELATED ITEMS</Text>
            <ListView
              horizontal={true}
              style={{flex:1}}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => 
                <View style={{ width: Metrics.screenWidth * 0.5 + 10, height: Metrics.screenWidth * 0.5 + 10, margin: 5, padding: 5, flexDirection: 'row', borderRadius: 10, backgroundColor: '#dddddd' }}>
                  <Image style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3}} source={Images.food1} />
                  <View style={{width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3,  backgroundColor: 'white'}}>
                    <View style={[Styles.center, {flex:1, backgroundColor: 'grey'}]}>
                      <Text style={{ color: 'white'}}>$48.00</Text>
                    </View>
                    <Text style={{ flex: 1, color: 'grey'}}>$52.00</Text>
                    <Text style={{ flex:1}}>Hot Dog</Text>
                    <View style={{flex:1}} />
                    <Text style={{ flex: 1, fontSize: 10}}>In store</Text>
                    <Text style={{ flex: 1, fontSize: 10}}>Save 4.00$ </Text>
                    <View style={{ flex: 1.5, justifyContent:'center', alignItems:'center', borderRadius: 3, backgroundColor: Colors.brandPrimary}}>
                      <Text style={{fontSize: 11,  color: 'white'}}>ADD TO CART</Text>
                    </View>
                  </View>
                </View>}
            />
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

Product.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Product);
