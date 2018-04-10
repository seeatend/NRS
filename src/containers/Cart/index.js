import { Platform, TextInput, Image, findNodeHandle, View, ListView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Container, Content, Card, CardItem, Left, Right, Body, Thumbnail, Text, Button } from 'native-base';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/FontAwesome';
import SudokuGrid from 'react-native-smart-sudoku-grid';
import Modal from 'react-native-simple-modal';

import { replaceRoute, pushNewRoute, popRoute } from '@actions/route';
import { setDetail } from '@actions/globals';


import { Metrics, Styles, Images, Colors } from '@theme/';
import styles from './styles';

import homeData from '../../dummy/homeData.json';
import Global from '@src/Global';
const dataList = [
    {
        name: 'Bread',
        cost: 100,
        count: 1,
    }, 
    {
        name: 'Apple',
        cost: 30,
        count: 1,
    }, 
    {
        name: 'Pork',
        cost: 50,
        count: 1,
    },
];

const cholocate = {
    name: 'Choco',
    cost: 1,
    count: 1,
  };

class Cart extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      viewRef: 0,
      cartList: dataList,
      totalCost: 0,
      open1: false,
      open2: false,
      choco: false,
      specOffer: cholocate,
      clickedAddCart: false,
    };
  }

  componentWillMount(){
    var temp = 0;
    this.state.cartList.map( item => {
      temp += item.cost * item.count;
    })
    this.setState({totalCost: temp});
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

  _renderGridCell = (data, index) => (
    
    <View style={{width: Metrics.screenWidth * 0.95, alignSelf: 'center', marginTop: 10, height: Metrics.screenWidth * 0.45, backgroundColor: 'white', borderRadius: 10, flexDirection:'row'}}>
      <View style={{flex: 3}}>
        <Image source={Images.food1} style={{ flex: 1, width: null, height: null, margin: 10}}/>
      </View>
            
      <View style={{flex: 3, backgroundColor: '#ffffff',  justifyContent: 'space-between'}}>
        <Text style={{ marginTop: 10, fontSize: Metrics.screenHeight / 30}}>{data.name}</Text>
        <Text>17 oz</Text>
        <View style={[Styles.left, { flexDirection: 'row'}]}>
          <Icon
            style={{fontSize: 15, color: Colors.buttonPrimary, marginRight: 5,}}
            containerStyle={Styles.center}
            color={Colors.textPrimary}
            name={'shopping-cart'}/>
          <Text style={{color: Colors.buttonPrimary}}>Delivery</Text>
        </View>
        <Text style={{ marginBottom: 10, fontSize: Metrics.screenHeight / 30}}>${data.cost}</Text>
      </View>
      <View style={[Styles.center, {flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'grey', borderBottomRightRadius:10, borderTopRightRadius:10}]}>      
        <TouchableOpacity onPress={this._onPressPlus.bind(this, data, index ) }>  
            <Icon
                style={{marginTop: 20, fontSize: 20, color: 'white', marginRight: 2}}
                containerStyle={Styles.center}
                color={Colors.textPrimary}
                name={'plus'}/>
        </TouchableOpacity>
        <Text style={{color: 'white'}}>{data.count}</Text>
        <TouchableOpacity>
            {
                data.count > 1 &&
                <Icon
                    onPress={ this._onPressMinus.bind(this, data, index ) }
                    style={{marginBottom: 20, fontSize: 20, color: 'white', marginRight: 2}}
                    containerStyle={Styles.center}
                    color={Colors.textPrimary}
                    name={'minus'}/>
            }
            {
                data.count == 1 &&
                <Icon
                    onPress={ this._onDeleteCart.bind(this, data, index ) }
                    style={{marginBottom: 20, fontSize: 20, color: 'white', marginRight: 2}}
                    containerStyle={Styles.center}
                    color={Colors.textPrimary}
                    name={'trash-o'}/>
            }
        </TouchableOpacity>
      </View>
    </View>
    
  )

  _onPressPlus = (data, index) => {
      var temp = this.state.cartList;
      temp[index].count += 1;
      this.setState({ cartList: temp });
      this.setState({ totalCost: this.state.totalCost + temp[index].cost});
  }

  _onPressMinus = (data, index) => {
      var temp = this.state.cartList;
      temp[index].count -= 1;
      this.setState({ cartList: temp });
      this.setState({ totalCost: this.state.totalCost - temp[index].cost});
  }

  _onDeleteCart = (data, index) => {
      var temp = this.state.cartList;
      this.setState({ totalCost: this.state.totalCost - temp[index].cost});
      temp.splice(index, 1);
      this.setState({ cartList: temp });
  }

  _onAddCart = () => {
    this.state.cartList.push(cholocate);
    this.setState({choco: true});
    this.setState({ totalCost: this.state.totalCost + this.state.specOffer.cost});
    this.setState({clickedAddCart: true});
  }

  _onBack = () => {
    this.props.popRoute()
    this.setState({open2: false})
  }

  _onModal = () => {
    if (this.state.open1 == false && this.state.open2 == false)
      this.setState({open1: true})
  }

  _onPlus = () => {
    this.state.specOffer.count += 1
  }

   _onMinus = () => {
    this.state.specOffer.count -= 1
  }

   _onDelete = () => {
    this.state.cartList.splice(cholocate)
  }

  toCheckout = () => {
    this.setState({open2: false})
    this.pushNewRoute('checkout')
  }

  render() {
    return (
      <View style={[Styles.fullScreen, {backgroundColor:'lightgrey'}]}> 
        <View style={[styles.headerView, {backgroundColor: Colors.brandPrimary, flexDirection:'row'}]}>
          <TouchableOpacity onPress={() => this._onBack()}>
          <Icon
              style={{fontSize: 20, color: Colors.textSecondary, marginLeft:20}}
              containerStyle={Styles.center}
              color={Colors.textPrimary}
              name={'arrow-left'}/>
          </TouchableOpacity>
          <Text style={{flex:1, color:'white', fontSize:15, marginLeft:20}}> Cart </Text>
        </View>
        
        <ScrollView>
          <SudokuGrid
            columnCount={1}
            dataSource={this.state.cartList}
            renderCell={this._renderGridCell}
          />
        </ScrollView>

        <View style={[Styles.center, {backgroundColor:'white'}]}>
            <TouchableOpacity onPress={() => this._onModal()} style={[Styles.center, { backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.7, height: Metrics.footerHeight * 0.7, marginTop: Metrics.footerHeight * 0.15, marginBottom: Metrics.footerHeight * 0.15, borderRadius: 5}]}>
                <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>CHECKOUT NOW   ${this.state.totalCost}</Text>
            </TouchableOpacity>
        </View>
        <Modal
          offset={this.state.offset}
          open={this.state.open1}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({open1: false})}
          style={{alignItems: 'center'}}>
          <Text style={{textAlign:'center', fontSize: 20, marginBottom: 10}}>SPECIAL OFFER</Text>
          <View style={{marginTop: 10, alignSelf: 'center', backgroundColor: 'white', borderRadius: 10, flexDirection:'row'}}>
            <View style={{flex: 2}}>
              <Image source={Images.food1} style={{ flex: 1, width: null, height: null, margin: 10,}}/>
            </View>
            
            <View style={{flex: 3, backgroundColor: '#ffffff',  justifyContent: 'space-between'}}>
              <Text numberOfLines={2} style={{ fontSize: Metrics.screenHeight / 30}}>Chocolate Pound Cake</Text>
              <View style={[Styles.left, { marginTop: 10, flexDirection: 'row'}]}>
                <Icon
                  style={{fontSize: 15, color: Colors.buttonPrimary, marginRight: 5,}}
                  containerStyle={Styles.center}
                  color={Colors.textPrimary}
                  name={'shopping-cart'}/>
                <Text style={{color: Colors.buttonPrimary}}>In Store</Text>
              </View>
              <Text style={{ marginTop: 10, fontSize: Metrics.screenHeight / 30}}>$5.25</Text>
            </View>
          </View>
          <View style={{marginTop: 20, alignSelf: 'center', backgroundColor: 'white', borderRadius: 10, flexDirection:'row'}}>
            <TouchableOpacity onPress={() => this.setState({open1: false, open2: true})} style={[Styles.center, { flex: 1, backgroundColor: Colors.buttonSecondary, width: Metrics.screenWidth * 0.7, height: Metrics.footerHeight * 0.7, marginTop: Metrics.footerHeight * 0.15, marginBottom: Metrics.footerHeight * 0.15, borderRadius: 5}]}>
              {
                this.state.choco == true &&
                <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>DONE</Text>
              }

              {
                this.state.choco == false &&
                <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>NO THANKS</Text>
              }

            </TouchableOpacity>
            {
              this.state.clickedAddCart == false &&
              <TouchableOpacity onPress={() => this._onAddCart()} style={[Styles.center, { flex: 1, marginLeft: 10, backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.7, height: Metrics.footerHeight * 0.7, marginTop: Metrics.footerHeight * 0.15, marginBottom: Metrics.footerHeight * 0.15, borderRadius: 5}]}>
              
                <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>ADD TO CART</Text>
              
              </TouchableOpacity>
            }

            {
              this.state.clickedAddCart == true &&
              <View style={[Styles.center, { flexDirection:'row', flex: 1, marginLeft: 10, backgroundColor: 'grey', justifyContent: 'space-between', width: Metrics.screenWidth * 0.7, height: Metrics.footerHeight * 0.7, marginTop: Metrics.footerHeight * 0.15, marginBottom: Metrics.footerHeight * 0.15, borderRadius: 5}]}>      
                  <TouchableOpacity>  
                      <Icon
                          //onPress={this._onPlus()}
                          style={{fontSize: 20, color: 'white'}}
                          containerStyle={Styles.center}
                          color={Colors.textPrimary}
                          name={'plus'}/>
                  </TouchableOpacity>
                  <Text style={{color: 'white'}}>{this.state.specOffer.count}</Text>
                  <TouchableOpacity>
                      {
                          this.state.specOffer.count > 1 &&
                          <Icon
                              //onPress={ this._onMinus() }
                              style={{fontSize: 20, color: 'white'}}
                              containerStyle={Styles.center}
                              color={Colors.textPrimary}
                              name={'minus'}/>
                      }
                      {
                          this.state.specOffer.count == 1 &&
                          <Icon
                              //onPress={ this._onDelete() }
                              style={{fontSize: 20, color: 'white'}}
                              containerStyle={Styles.center}
                              color={Colors.textPrimary}
                              name={'trash-o'}/>
                      }
                  </TouchableOpacity>
              </View>
            }
      
          </View>
        </Modal>
         <Modal
          offset={this.state.offset}
          open={this.state.open2}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({open2: false})}
          style={{alignItems: 'center'}}>
          <Text style={{textAlign:'center', fontSize: 15, marginTop: 5}}>CHECKOUT</Text>
          <Text style={{textAlign:'center', fontSize: 15, marginTop: 15}}>How do you want to get your order?</Text>
          <TouchableOpacity style={[Styles.center, { marginLeft: Metrics.screenWidth * 0.25, backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.4, height: Metrics.footerHeight * 0.7, marginTop: Metrics.footerHeight * 0.5, borderRadius: 5}]}>
            <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>PICKUP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toCheckout()} style={[Styles.center, { marginLeft: Metrics.screenWidth * 0.25, backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.4, height: Metrics.footerHeight * 0.7, marginTop: Metrics.footerHeight * 0.5, borderRadius: 5}]}>
            <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>DELIVERY</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: Metrics.footerHeight * 0.5, textAlign: 'center', fontSize: Metrics.screenHeight / 50}}>Next delivery: Monday 13th 2.00 pm</Text>
          <Text style={{ textAlign: 'center', fontSize: Metrics.screenHeight / 50}}>Delivery fee$1.70</Text>
        </Modal>
      </View>
    );
  }
}

Cart.propTypes = {
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
  return { 
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
