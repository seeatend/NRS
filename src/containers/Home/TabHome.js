import { Platform, TextInput, Image, findNodeHandle, View, ListView, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
import Global from '@src/Global';
import Rating from '@components/Rating';
import ShopCard from '@components/ShopCard'
import SearchBox from '@components/SearchBox'
import ProductRow from '@components/ProductRow'


const shops =  [
  {
    id: 1,
    name: "Amos's Shop",
    address: "727 MANHATTAN AVE, PROOKLYN, NY 11222, USA",
    openingTimes: "Monday to Friday 4:30AM~8PM",
    rating: 5
  },
  {
    id: 2,
    name: "STARLING",
    address: "727 MANHATTAN AVE, PROOKLYN, NY 11222, USA",
    openingTimes: "Monday to Friday 4:30AM~8PM",
    rating: 1
  }
]

const categories = ['category1', 'category2'];

class TabHome extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(categories),
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
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.refs.backgroundImage) })
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
          <TouchableOpacity onPress={() => this.pushNewRoute('cart')}> 
          <Icon
            style={{ fontSize: 20, color: Colors.textSecondary, marginLeft: 20, marginRight: 20 }}
            containerStyle={Styles.center}
            color={Colors.textPrimary}
            name={'shopping-cart'} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Image
            style={{ width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5 }}
            resizeMode={'contain'}
            source={Images.store2}>
            
              <Swiper height={Metrics.screenHeight * 0.5} horizontal={true} style={{ backgroundColor: 'transparent' }}>
                {shops.map(shop => (<ShopCard shop={shop}/>)) }
              </Swiper>
            
          </Image>
          <SearchBox setText={(text) => this.setState({ text })} />
          <ListView
            horizontal={false}
            style={{ flex: 1 }}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <ProductRow/> }
          />
        </ScrollView>
      </View >
    );
  }
}

TabHome.propTypes = {
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
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(TabHome);
