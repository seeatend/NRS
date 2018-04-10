import { Platform, TextInput, Image, findNodeHandle, View, ListView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Container, Content, Card, CardItem, Left, Right, Body, Thumbnail, Text, Button , Form, Item, Input, Label, InputGroup, Separator, ListItem} from 'native-base';
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
const dayDates = [
    {
        date: "Apr 1",
        day: "Monday"
    },
    {
        date: "Apr 2",
        day: "Tuesday"
    },
    {
        date: "Apr 3",
        day: "Wednesday"
    },
    {
        date: "Apr 4",
        day: "Thursday"
    },
    {
        date: "Apr 5",
        day: "Friday"
    },
    {
        date: "Apr 6",
        day: "Saturday"
    },
    {
        date: "Apr 7",
        day: "Sunday"
    }
]
class Choosedeliverytime extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
        dataSource: ds.cloneWithRows(dayDates),
        bg:'white',
        open:false,
    };

  }

  replaceRoute(route) {
    this.props.replaceRoute(route);
  }
  pushNewRoute(route) {
    this.props.pushNewRoute(route);
  }

  Tocredit = () => {
    this.setState({open:false})
    this.pushNewRoute('addpayment')
  }
  
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
          <Text style={{flex:1, color:'white', fontSize:15, marginLeft:20}}> Choose delivery time </Text>
        </View>
        <View style={{backgroundColor:'lightgrey', height:Metrics.screenHeight * 0.2}}>
        <ListView            
            horizontal={true}
            contentContainerStyle={{justifyContent:'center'}}
            style={{ flex: 1 }}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
            <TouchableOpacity onPress={() => this.setState({bg:'red'})} style={[Styles.center, {borderWidth:1, borderRadius:5, borderColor:'white', marginLeft:10, marginTop:25, backgroundColor:this.state.bg, width:Metrics.screenWidth * 0.25, height:Metrics.screenWidth * 0.25}]}>                
                <Text>{rowData.day}</Text>
                <Text>{rowData.date}</Text>
            </TouchableOpacity>
            }   
        />
        </View>
        <Container>
            <Content>
                <ListItem>
                    <Text>9AM-11AM</Text>
                </ListItem>
                <ListItem >
                    <Text>10AM-NOON</Text>
                </ListItem>
                <ListItem>
                    <Text>11AM-1PM</Text>
                </ListItem>
                <ListItem last>
                    <Text>NOON-2PM</Text>
                </ListItem>
                <ListItem>
                    <Text>1PM-3PM</Text>
                </ListItem>
                <ListItem>
                    <Text>2PM-4PM</Text>
                </ListItem>     
            </Content>
        </Container>
        <View style={[Styles.center]}>
            <TouchableOpacity  onPress={()=>this.setState({open:true})} style={[Styles.center, { backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.6, height: Metrics.footerHeight * 0.6, marginTop: Metrics.footerHeight * 0.15, marginBottom: Metrics.footerHeight * 0.5, borderRadius: 5}]}>
                <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>SAVE DELIVERY TIME</Text>
            </TouchableOpacity>
        </View>
        <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({open: false})}
          style={{alignItems: 'center'}}>
          <Text style={{textAlign:'center', fontSize: 15, marginTop: 5}}>PAYMENTS</Text>
          <Text style={{textAlign:'center', fontSize: 15, marginTop: 15}}>Choose your payment method</Text>
          <TouchableOpacity onPress={() => this.setState({open:false})}style={[Styles.center, { marginLeft: Metrics.screenWidth * 0.25, backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.4, height: Metrics.footerHeight * 0.7, marginTop: Metrics.footerHeight * 0.5, borderRadius: 5}]}>
            <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>PAY AT STORE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.Tocredit()} style={[Styles.center, { marginLeft: Metrics.screenWidth * 0.25, backgroundColor: Colors.brandPrimary, width: Metrics.screenWidth * 0.4, height: Metrics.footerHeight * 0.7, marginTop: Metrics.footerHeight * 0.5, borderRadius: 5}]}>
            <Text style={{ fontSize: Metrics.footerHeight * 0.3, color: 'white'}}>CREDIT</Text>
          </TouchableOpacity>
        </Modal>

        </View> 
    );
  }
}

Choosedeliverytime.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Choosedeliverytime);
