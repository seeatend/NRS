import React, { Component } from 'react';
import { BackAndroid, Platform, StatusBar, View, Navigator } from 'react-native';
import { connect } from 'react-redux';
import StatusBarAndroid from 'react-native-android-statusbar';

import Drawer from 'react-native-drawer';

import { popRoute } from '@actions/route';
import { closeDrawer } from '@actions/drawer';

import { Colors } from '@theme';

import Splash from '@containers/Splash';
import Home from '@containers/Home';
import Store from '@containers/Store';
import Product from '@containers/Product';
import Cart from '@containers/Cart'
import Checkout from '@containers/Checkout';
import Choosedeliverytime from '@containers/Choosedeliverytime';
import Addpayment from '@containers/Addpayment';
import Orderconfirmed from '@containers/Orderconfirmed';

import SideBar from '@containers/SideBar';

Navigator.prototype.replaceWithAnimation = function (route) {
  const activeLength = this.state.presentedIndex + 1;
  const activeStack = this.state.routeStack.slice(0, activeLength);
  const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
  const nextStack = activeStack.concat([route]);
  const destIndex = nextStack.length - 1;
  const nextSceneConfig = this.props.configureScene(route, nextStack);
  const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

  const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
  this._emitWillFocus(nextStack[destIndex]);
  this.setState({
    routeStack: nextStack,
    sceneConfigStack: nextAnimationConfigStack,
  }, () => {
    this._enableScene(destIndex);
    this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
      this.immediatelyResetRouteStack(replacedStack);
    });
  });
};

export var globalNav = {};

class AppNavigator extends Component {


  componentDidMount() {
    globalNav.navigator = this._navigator;
    
    if(this.props.drawerState == 'opened')
            this.openDrawer();

        if(this.props.drawerState == 'closed')
            this._drawer.close();

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this._navigator.getCurrentRoutes();

      if (routes[routes.length - 1].id === 'login') {
        return false;
      }
      else {
        this.popRoute();
        return true;
      }
    });
  }
  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }
  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  renderScene(route, navigator) {
    switch (route.id) {
      case 'splash':
        return <Splash navigator={navigator} {...route.passProps} />;
      case 'home':
        return <Home navigator={navigator} {...route.passProps} />;
      case 'store':
        return <Store navigator={navigator} {...route.passProps} />;
      case 'product':
        return <Product navigator={navigator} {...route.passProps} />;
      case 'cart':
        return <Cart navigator={navigator} {...route.passProps} />;
      case 'checkout':
        return <Checkout navigator={navigator} {...route.passProps} />;
      case 'choosedeliverytime':
        return <Choosedeliverytime navigator={navigator} {...route.passProps} />;
      case 'addpayment':
        return <Addpayment navigator={navigator} {...route.passProps} />;
      case 'orderconfirmed':
        return <Orderconfirmed navigator={navigator} {...route.passProps} />;  
      default :
        return <Home navigator={navigator} {...route.passProps} />;
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        openDrawerOffset
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.3}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent
          hidden
        />
        <Navigator
          ref={(ref) => { this._navigator = ref; }}
          configureScene={(route) => {
            if (route.id === 'splash') return Navigator.SceneConfigs.FadeAndroid;
            else if (route.id === 'login') return Navigator.SceneConfigs.FadeAndroid;
            else if (route.id === 'register') return Navigator.SceneConfigs.FadeAndroid;
            return Navigator.SceneConfigs.PushFromRight;
          }}
          initialRoute={{ id: (Platform.OS === 'android') ? 'splash' : 'splash', statusBarHidden: true }}
          renderScene={this.renderScene}
        />
      </Drawer>
      
    );
  }
}
AppNavigator.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  popRoute: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    popRoute: () => dispatch(popRoute()),
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

function mapStateToProps(state) {
  const { drawerState } = state.get('drawer');
  return { drawerState };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
