import { Platform, Image, View, Text, Thumbnail, ListView } from 'react-native';
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { Metrics, Styles, Images, Colors } from '@theme/';

const products = [
    {
        name: "Hot Dog",
        price: "$52.00",
        originalPrice: "$52.00",
        discount: "Save 4.00$",
        inStore: true,
        image: Images.food1
    },
    {
        name: "Hot Dog",
        price: "$52.00",
        originalPrice: "$52.00",
        discount: "Save 4.00$",
        inStore: true,
        image: Images.food1
    },
    {
        name: "Hot Dog",
        price: "$52.00",
        originalPrice: "$52.00",
        discount: "Save 4.00$",
        inStore: true,
        image: Images.food1
    }
];

export default class ProductRow extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(products),
        };
    }
    render() {
        const product = {
            name: "Hot Dog",
            price: "$52.00",
            originalPrice: "$52.00",
            discount: "Save 4.00$",
            inStore: true,
            image: Images.food1
        }
        const actions = {
            addToCart: {
                title: "ADD TO CART",
                action: function () { }
            }
        }

        const inStoreText = product.inStore == true ? "In store" : "Missing";

        return (
            <View style={{ backgroundColor: '#eeeeee' }}>
                <View style={{}}>
                    <Text style={{ marginLeft: 10, fontSize: 13 }}>Fast Food</Text>
                    <ListView
                        horizontal={true}
                        style={{ flex: 1 }}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                            <View style={{ width: Metrics.screenWidth * 0.5 + 10, height: Metrics.screenWidth * 0.5 + 10, margin: 5, padding: 5, flexDirection: 'row', borderRadius: 10, backgroundColor: '#dddddd' }}>
                                <Image style={{ width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3 }} source={product.image} />
                                <View style={{ width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.5, padding: 3, backgroundColor: 'white' }}>
                                    <View style={[Styles.center, { flex: 1, backgroundColor: 'grey' }]}>
                                        <Text style={{ color: 'white' }}>{product.price}</Text>
                                    </View>
                                    <Text style={{ flex: 1, color: 'grey' }}>{product.originalPrice}</Text>
                                    <Text style={{ flex: 1 }}>{product.name}</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={{ flex: 1, fontSize: 10 }}>{inStoreText}</Text>
                                    <Text style={{ flex: 1, fontSize: 10 }}>{product.discount}</Text>
                                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', borderRadius: 3, backgroundColor: Colors.brandPrimary }}>
                                        <Text style={{ fontSize: 11, color: 'white' }}>{actions.addToCart.title}</Text>
                                    </View>
                                </View>
                            </View>}
                    />
                </View>
            </View>
        )
    }
}