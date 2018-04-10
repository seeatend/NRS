import { Platform, Image, View, Text } from 'react-native';
import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Metrics, Styles, Images, Colors } from '@theme/';
import Rating from './Rating';

const { BlurView, VibrancyView } = require('react-native-blur');


export default class    extends Component {
    static propTypes = {
        "shop" : React.PropTypes.object.isRequired,
    }
    render() {
        const shop = this.props.shop
        const actions = {
            changeStoreAction : {
                title: "CHANGE STORE",
                action: function () { }
            },
            setAsFavorite : {
                title: "SET AS A FAVORITE",
                action: function () { }
            }
        }
        const metrics = Metrics;
        const center = Styles.center;
        const colors = Colors;
        const starSize = metrics.starSize;
        const storeImage = Images.store2;
        // TODO: please change this becuase somehow image doens't show!
        const  showThumb = true;

        return (
            <View style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, backgroundColor: 'black'}}>              
              <Image
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, opacity: 0.5}}
                resizeMode={'stretch'}
                source={Images.store2} >                  
              </Image>  
              <View
                style={{width: Metrics.screenWidth, height: Metrics.screenHeight * 0.5, position:'absolute', right: 0, left:0, bottom: 0, top: 0}}
                resizeMode={'stretch'}>
                <View style={{ flex:0.3, backgroundColor: 'transparent'}}></View>
                  <View style={[Styles.center, { flex:1.3, flexDirection: 'row', backgroundColor: 'transparent'}]}>
                    <View style={Styles.center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={Styles.center}
                        color={Colors.textPrimary}
                        name={'location-arrow'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>
                        {actions.changeStoreAction.title}
                      </Text>        
                    </View>
                    {showThumb && <Image style={{ width: metrics.screenWidth * 0.15, height: metrics.screenWidth * 0.15, borderRadius: metrics.screenWidth * 0.075 }} source={storeImage} />}
                    <View style={center}>
                      <Icon
                        style={{fontSize: 20, color: Colors.textSecondary}}
                        containerStyle={center}
                        color={Colors.textPrimary}
                        name={'heart-o'}
                      />
                      <Text style={{margin:5, fontSize: 9, color: Colors.textSecondary}}>
                        {actions.setAsFavorite.title}
                      </Text>        
                    </View>
                  </View>
                  <View style={{ flex:1, backgroundColor: 'transparent', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, color: Colors.textSecondary}}>{shop.name}</Text>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>
                      {shop.address}
                    </Text>
                    <Rating
                      style={{marginTop: 30}}
                      rating={shop.rating}
                      max={5}
                      iconWidth={Metrics.starSize / 4}
                      iconHeight={Metrics.starSize / 4}
                      editable={false} />
                  </View>
                  <View style={[Styles.center, { flex:1, backgroundColor: 'transparent'}]}>
                    <Text style={{fontSize: 10, color: Colors.textSecondary}}>shop.openingTimes</Text>
                  </View>
              </View>
            </View>
        )
    }
}

