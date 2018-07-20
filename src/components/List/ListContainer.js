import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { List, SearchBar } from "react-native-elements"
import Item from "../Item/Item";
import {connect} from "react-redux";
import { getData } from "../../store/actions/data";
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

class ListContainer extends Component {



  componentDidMount() {
    this.props.fetchData(this.props.seed,this.props.page,this.props.data);
  }

  

  // handleRefresh = () => {
  //   alert()
  //   this.setState({
  //     page: 1,
  //     refreshing: true,
  //     seed: this.state.seed + 1
  //   }, () => this.makeRemoteRequest())

  // }

  // handleMore = () => {
  //   this.setState({
  //     page: this.state.page + 1
  //   }, () => this.makeRemoteRequest())
  // }

  renderHeader = () => {
    return (
      <SearchBar round placeholder="Type Here..." />
    )
  }
  // renderSeparator = () => {
  //   return (
  //     <View
  //       style={styles.seperator} />
  //   )
  // }
  // renderFooter = () => {
  //   if (!this.state.loading) return null;

  //   return (
  //     <View
  //       style={{
  //         paddingVertical: 20,
  //         borderTopWidth: 1,
  //         borderColor: "#CED0CE",
  //         marginTop: 10
  //       }}
  //     >
  //       <ActivityIndicator animating size="large" />
  //     </View>
  //   );
  // }
  render() {
    
    alert(this.props.data.coun);
    return (
      <FlatList
        style={{ flex: 1 }}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        ItemSeparatorComponent={this.renderSeparator}
        data={this.props.data}
        keyExtractor={item => item.email}
        refreshing={this.props.refreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleMore}
        onEndReachedThreshold={.5}
        renderItem={({ item }) => {
          return (
            // <Item 
            // key={item.email}
            //   subtitle={item.email}
            //   title={`${item.name.first} ${item.name.last}`}
            //   avatar={{ uri: item.picture.thumbnail }}
            // />

            <ListItem avatar onPress={() => alert(item.email)}>
              <Left>
                <Thumbnail source={{ uri: item.picture.thumbnail }} />
              </Left>
              <Body>
                <Text>{item.name.first}</Text>
                <Text note>{item.email}</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          )
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  List: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  seperator: {
    height: 1,
    width: "86%",
    backgroundColor: "orange",
    marginLeft: "14%"
  },
  footerContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  }
})
const mapDispatchToProps = dispatch=>{
  return {
    fetchData:(seed,page,data)=>dispatch(getData(seed,page,data))
  }
}
const mapstateToProps = state=>{
  return{
    loading: state.data.loading,
      data:state.data.data,
      page: state.data.page,
      seed: state.data.seed,
      error: state.data.error,
      refreshing:state.data.error
  }
}
export default connect(mapstateToProps,mapDispatchToProps)(ListContainer);