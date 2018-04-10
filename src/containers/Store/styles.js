import { StyleSheet } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from '@theme/';

export default StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  tabBarStyle: {
    ...Styles.center,
    borderTopWidth: 1,
    borderColor: Colors.borderPrimary,
  },
  titleStyle: {
    ...Fonts.style.regular,
    color: Colors.textPrimary,
  },
  badgeContainer: {
    ...Styles.center,
    marginTop: 15,
    marginRight: 3,
    width: 14,
    height: 14,
    backgroundColor: Colors.brandDanger,
    borderRadius: 7,
  },
  badgeTextStyle: {
    ...Fonts.style.regular,
    fontSize: Fonts.size.mini,
    color: Colors.textSecondary,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  tabIconsContainer: {
    ...Styles.center,
    width: Metrics.screenWidth / 12,
    height: Metrics.screenWidth / 12,
  },  
  headerView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth,
    borderColor: '#EEE',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0, height: 8,
    },
    shadowColor: '#000',
    shadowRadius: 4,
    elevation: 8
  },

});