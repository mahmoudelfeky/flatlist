import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { List, SearchBar } from "react-native-elements"
import Item from "../Item/Item";

import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

class ListContainer extends Component {



  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {

        setTimeout(() => {
          this.setState({
            data: page === 1 ? res.results : [...this.state.data, ...res.results],
            error: res.error || null,
            loading: false,
            refreshing: false
          });
        }, 2000)
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  };

  handleRefresh = () => {
    alert()
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed + 1
    }, () => this.makeRemoteRequest())

  }

  handleMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => this.makeRemoteRequest())
  }

  renderHeader = () => {
    return (
      <SearchBar round placeholder="Type Here..." />
    )
  }
  renderSeparator = () => {
    return (
      <View
        style={styles.seperator} />
    )
  }
  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
          marginTop: 10
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  render() {
    return (

      <FlatList
        style={{ flex: 1 }}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        ItemSeparatorComponent={this.renderSeparator}
        data={this.state.data}
        keyExtractor={item => item.email}
        refreshing={this.state.refreshing}
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

export default ListContainer;