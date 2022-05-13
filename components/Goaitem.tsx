import React from "react";  
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight} from "react-native";
const GoalItem= (props:any) =>{
    return (
    <TouchableOpacity onPress={props.onDelete}>
        <View style={styles.listItem}>
            <Text style={styles.goalText}>{props.title}</Text>
        </View>
    </TouchableOpacity>
    )
};//we'll pass the title from the component from which it was called like a function
//many types of touchables

const styles=StyleSheet.create({
    listItem: {
        padding: 8,
        backgroundColor: "#5e0acc",
        borderBottomColor: "black",
        borderWidth: 1,
        marginVertical: 1,
        borderRadius: 6, 
        margin:8,
        },

    goalText:{
        color:'white'
    }
    //text element does not take in rounded corners in iOS
    
    });

export default GoalItem;