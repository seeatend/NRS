import { Platform, TextInput, Image, findNodeHandle, View, ListView, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Container, Content, Card, CardItem, Left, Right, Body, Thumbnail, Text, Button , Form, Item, Input, Label, Segment} from 'native-base';
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

class Addpayment extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     trueSwitchIsOn: true,
    // falseSwitchIsOn: false,
    // };
  }

  replaceRoute(route) {
    this.props.replaceRoute(route);
  }
  pushNewRoute(route) {
    this.props.pushNewRoute(route);
  }
  
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
          <Text style={{flex:1, color:'white', fontSize:15, marginLeft:20}}> Add payment </Text>
        </View>
        <View style={{ backgroundColor: 'lightgrey', width: Metrics.screenWidth, height: Metrics.footerHeight * 0.4, marginTop: Metrics.footerHeight * 0.15}}>
            <Text style={{ marginLeft: 20, fontSize: Metrics.footerHeight * 0.25}}>S C A N  Y O U R  C A R D</Text>
        </View>
        <View style={[Styles.center, {backgroundColor:'white', height:Metrics.screenHeight * 0.2}]}>
            <Text style={{backgroundColor:'lightgrey'}}> 1234 5678 1234 5678                </Text>
        </View>
        <View style={{ backgroundColor: 'lightgrey', width: Metrics.screenWidth, height: Metrics.footerHeight * 0.4, marginTop: Metrics.footerHeight * 0.15}}>
            <Text style={{ marginLeft: 20, fontSize: Metrics.footerHeight * 0.25}}>C R E D I T  C A R D</Text>
        </View>

        <Form style={{backgroundColor:'white'}}>
            <Item floatingLabel last>
                <Label>Credit Card Number </Label>
                <Input />
            </Item>
            
            <Item floatingLabel last>
                <Label>MM/YY</Label>
                <Input />
            </Item>
            <Item floatingLabel last>
                <Label>CVC</Label>
                <Input />
            </Item>
            <Item floatingLabel last>
                <Label></Label>
                <Input />
            </Item>
        </Form>

        <View style={{flexDirection:'row', backgroundColor:'white', height:Metrics.screenHeight * 0.065}}>
            <View style={{justifyContent:'center', flex:0.7}}>
                <Text> Use this card in future orders </Text>
            </View>
            <View style={{justifyContent:'center', flex:0.3}}>
                <Container>
                    <Segment>
                        <Button first><Text></Text></Button>
                        <Button last active><Text></Text></Button>
                    </Segment>
                </Container>
            </View>
        </View>
        <View style={[Styles.center, {marginTop: Metrics.screenHeight * 0.16}]}>
        <TouchableOpacity  onPress={() => this.pushNewRoute('orderconfirmed')} style={[Styles.center, { backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.6, height: Metrics.footerHeight * 0.6, marginTop: Metrics.footerHeight * 0.15, marginBottom: Metrics.footerHeight * 0.5, borderRadius: 5}]}>
            <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>NEXT</Text>
        </TouchableOpacity>
        </View>
     </View> 
    );
  }
}

Addpayment.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Addpayment);
