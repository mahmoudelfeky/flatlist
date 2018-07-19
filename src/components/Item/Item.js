import React  from "react";
import { ListItem } from "react-native-elements"
import { StyleSheet,ToastAndroid,TouchableOpacity } from "react-native";


const Item = (props)=>{
    return <ListItem
    onPress = {()=>{
        alert(props.subtitle)
    }}
    containerStyle={styles.ListItem}
     title = {props.title}
     subtitle = {props.subtitle}
      roundAvatar avatar = {props.avatar} />
}

const styles = StyleSheet.create({

    ListItem: {
      borderBottomWidth: 0
    }
  })

export default Item