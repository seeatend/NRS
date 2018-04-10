import { StyleSheet } from 'react-native';
import { Styles, Fonts, Images, Colors, Metrics } from '@theme/';

module.exports = StyleSheet.create({
  image: {
    alignSelf: 'stretch',
    height: Metrics.screenHeight,
    width: null,
    position: 'relative',
  },
  signText: {
    color: Colors.brandSecondary,
    fontSize: 20,
    backgroundColor: 'transparent',
    margin: Metrics.section,
  },

  avatarNameText:{
    marginLeft: 10,
    fontSize: 14,    
    color: Colors.textThird,
    marginTop:15, 
    fontWeight:'bold'
  },

  itemView: {    
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection:'column',
    marginTop:5,
    alignItems:'flex-start'
  },
  itemText: {
    fontSize: 12,
    color: Colors.textThird,
    fontWeight:'bold'
  },
  itemUnderLine:{
    backgroundColor:'white', 
    marginLeft:0, 
    height:1, 
    marginTop:6, 
    alignSelf: 'stretch'},
});