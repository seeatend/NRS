import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';

import { replaceRoute, pushNewRoute, replaceOrPushRoute } from '@actions/route';
import { setHomeTab } from '@actions/globals';
import { closeDrawer } from '@actions/drawer';
import styles from './styles';
import { Styles, Fonts, Images, Colors, Metrics } from '@theme/';
import { Thumbnail } from 'native-base';

class SideBar extends Component {

  navigateTo(route) {
    this.props.closeDrawer();
  }
  replaceRoute(route) {
    this.props.closeDrawer();
    this.props.replaceRoute(route)
  }
  gotoHome() {
    this.props.closeDrawer();
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.brandPrimary, padding: 1}} >
        <TouchableOpacity style={{flex:1}} onPress={() => this.props.closeDrawer()}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


SideBar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  closeDrawer: React.PropTypes.func.isRequired,
  pushNewRoute: React.PropTypes.func.isRequired,
  replaceRoute: React.PropTypes.func.isRequired,
  replaceOrPushRoute: React.PropTypes.func.isRequired,
  setHomeTab: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    replaceRoute: route => dispatch(replaceRoute(route)),
    replaceOrPushRoute: route => dispatch(replaceOrPushRoute(route)),
    setHomeTab: homeTab => dispatch(setHomeTab(homeTab)),
    closeDrawer: () => dispatch(closeDrawer())
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  const route = state.get('route');
  return { globals, route };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);