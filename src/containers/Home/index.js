import { Text, View, TouchableOpacity, Platform, Image} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Tabs, Tab } from 'react-native-elements';

import { setHomeTab } from '@actions/globals';
import { Metrics, Styles, Images, Colors, Fonts } from '@theme/';
import styles from './styles';

import TabHome from './TabHome';
import TabShop from './TabShop';

class Home extends Component {
  setHomeTab(homeTab) {
    this.props.setHomeTab(homeTab);
  }
  renderTabButtonIcon(iconName, selected) {
    const iconColor = selected === true ? Colors.brandPrimary : Colors.textPrimary;
    return (
      <View style={styles.tabIconsContainer}>
        <Icon
          style={{ marginTop: 15 }}
          containerStyle={Styles.center}
          color={iconColor}
          name={iconName}
          size={Metrics.screenHeight / 25}
        />
      </View>
    );
  }
  renderBadge(badgeText) {
    return (
      <View style={styles.tabIconsContainer}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeTextStyle}>
            {badgeText}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const selectedTab = this.props.globals.homeTab;
    const selectedTabButtonStyle = { backgroundColor: Colors.backgroundPrimary };
    const unselectedTabButtonStyle = { backgroundColor: Colors.brandSecondary };
    return (
      <View style={[Styles.fullScreen, { backgroundColor: Colors.backgroundPrimary }]}>
        <Tabs tabBarStyle={styles.tabBarStyle}>
          <Tab
            selected={selectedTab === 'HOME'}
            tabStyle={selectedTab === 'HOME' ? selectedTabButtonStyle : unselectedTabButtonStyle}
            title={I18n.t('HOME')}
            titleStyle={[Fonts.style.regular, { color: Colors.textPrimary }]}
            selectedTitleStyle={[Fonts.style.regular, { color: Colors.textPrimary }]}
            renderIcon={() => this.renderTabButtonIcon('home', false)}
            renderSelectedIcon={() => this.renderTabButtonIcon('home', true)}
            onPress={() => this.setHomeTab('HOME')}
          >
            <TabHome />
          </Tab>
          <Tab
            selected={selectedTab === 'SHOP'}
            tabStyle={selectedTab === 'SHOP' ? selectedTabButtonStyle : unselectedTabButtonStyle}
            title={I18n.t('SHOP')}
            titleStyle={styles.titleStyle}
            selectedTitleStyle={styles.titleStyle}
            renderIcon={() => this.renderTabButtonIcon('shopping-cart', false)}
            renderSelectedIcon={() => this.renderTabButtonIcon('shopping-cart', true)}
            onPress={() => this.setHomeTab('SHOP')}
          >
            <TabShop />
          </Tab>
          <Tab
            selected={selectedTab === 'BR_CLUB'}
            tabStyle={selectedTab === 'BR_CLUB' ? selectedTabButtonStyle : unselectedTabButtonStyle}
            title={I18n.t('BR_CLUB')}
            titleStyle={styles.titleStyle}
            selectedTitleStyle={styles.titleStyle}
            renderIcon={() => this.renderTabButtonIcon('shield', false)}
            renderSelectedIcon={() => this.renderTabButtonIcon('shield', true)}
            onPress={() => this.setHomeTab('BR_CLUB')}
          >
            <View style={{ flex: 1, backgroundColor: 'blue' }} />
          </Tab>
          <Tab
            selected={selectedTab === 'BR_MONEY'}
            tabStyle={selectedTab === 'BR_MONEY' ? selectedTabButtonStyle : unselectedTabButtonStyle}
            title={I18n.t('BR_MONEY')}
            titleStyle={styles.titleStyle}
            selectedTitleStyle={styles.titleStyle}
            renderIcon={() => this.renderTabButtonIcon('money', false)}
            renderSelectedIcon={() => this.renderTabButtonIcon('money', true)}
            onPress={() => this.setHomeTab('BR_MONEY')}
          >
            <View style={{ flex: 1, backgroundColor: 'navy' }} />
          </Tab>
          <Tab
            selected={selectedTab === 'CHAT'}
            tabStyle={selectedTab === 'CHAT' ? selectedTabButtonStyle : unselectedTabButtonStyle}
            title={I18n.t('CHAT')}
            titleStyle={styles.titleStyle}
            selectedTitleStyle={styles.titleStyle}
            renderIcon={() => this.renderTabButtonIcon('comments-o', false)}
            renderSelectedIcon={() => this.renderTabButtonIcon('comments-o', true)}
            renderBadge={() => this.renderBadge('3')}
            onPress={() => this.setHomeTab('CHAT')}
          >
            <View style={{ flex: 1, backgroundColor: 'green' }} />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

Home.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  setHomeTab: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setHomeTab: homeTab => dispatch(setHomeTab(homeTab)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);