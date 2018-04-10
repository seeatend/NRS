import { Image, View, Text} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { replaceRoute } from '@actions/route';
import { Styles, Metrics, Colors, Images, Fonts } from '@theme/';

class Splash extends Component {
  componentWillMount() {
    setTimeout(() => {
      this.gotoLoginMain();
    }, 2500);
  }
  replaceRoute(route) {
    this.props.replaceRoute(route);
  }

  gotoLoginMain() {
    this.replaceRoute('home');
  }
  render() {
    return (
      <View style={[Styles.center, {flex:1, backgroundColor: Colors.brandPrimary}]}>
        <Text style={{color: 'white', fontSize: Fonts.h2}}>N R S</Text>
        <Text style={{color: 'white', fontSize: Fonts.h4}}>version 1.0</Text>          
      </View>
    );
  }
}

Splash.propTypes = {
  replaceRoute: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    replaceRoute: route => dispatch(replaceRoute(route)),
  };
}
function mapStateToProps(state) {
  return { };
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
