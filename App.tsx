import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  FlatList,
  ImageBackground
} from "react-native";

import GoalItem from "./components/Goaitem";
import GoalInput from "./components/Goalinput";

export default function App() {
  //functional component
  {
    /* const [outputText, setOutputText]=useState('Open up App.tsx to start working on your app!');//an array of state using the {useState} react hook
  return (
    <View style={styles.container}>
      <Text>{outputText}</Text>
      <Button title="Change Text" onPress={()=>setOutputText('The text changed')} />
      <Button title="change it again" onPress={()=>setOutputText('Changed again')}/>

    </View>
  )*/
  } //view is similar to div

  /**
breaking down use state hooks:
    +we provide an array of states; the first one being the default one
    +to trigger a state change, we simply reassingn the second element of usestate's value  
 */
  const image = { uri: "https://reactjs.org/logo-og.png" };
  const [courseGoals, setCourseGoals] = useState([] as any[]);
  const [EnterGoal, setEnterGoal]=useState(false);


  const addGoalHandler = (goalTitle:any) => {
    console.log(goalTitle);
    //setCourseGoals([...courseGoals, enteredGoal]); somehow bad implementation
    //==> we're using the return of an arrow function since flatlist requires a key:value pair
    //we are trying to get the latest input in; function is triggered on click so no input
    //courseGoals will always take the former value of setCourseGoals
    //we simply pass the old values to courseGoals
    //let's run it:
    /**
     * 1-enteredGoal will be returned to the setCourseGoals so courseGoals=enteredGaol[0]
     * 2-a new enteredGoal has been entered so thats passed to courseGoals again
     * 3-currentGoal would receive the aggregated values of all the goals
     * 4-so we receive the present value (aggregated former values of courseGoals) + the new value every time
     */
    setCourseGoals((currentGoal) => [
      ...currentGoal,
      {
        id: Math.random().toString(),
        value: goalTitle,
      },
      //better (recommended) than a setCourseGoals([...courseGoals, enteredGoal]) implementation to append new element
    ]); //flatLists require keys/objects;
    // we aggregate the former values of courseGoals and add the new one
    // {useState}   can take in array
    setEnterGoal(false)
    //the state can be toggled by calling the correct useState within the file

  };
  const cancelGoalAddition=()=>{
    setEnterGoal(false);
  };

  const removeGoalHandler=(goalId:String) =>{
    //we'll apply changes to the array countaining the goals
    setCourseGoals((currentGoals)=>{
      return currentGoals.filter((goal)=> goal.id !== goalId);//filter yields a new array based on a certain criteria 
    })//filter syntax here; we only keep the elements which satisfy the condition
    //the function would receive the id and then drop the element based on the id
  }
  /**
   * So courseGoal would be an empty array at first
   * spread operator unloads all the contents of an interrable
   * setCourseGoals would be an array as well
   */

  return (
    <View style={styles.screen}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}/>
      <Button  title="Enter Goals" onPress={()=>setEnterGoal(true)} />
      <View>
        <GoalInput 

          visible={EnterGoal} 
          onAddGoal={addGoalHandler}
          onCancel={cancelGoalAddition}//injecting the props for the component; since functions are first class obj
        />
      </View>
        {/**we pass the addGoalHandler function to the component */}
              {/**FlatList expects an object with a .key property; if we dont wanna use key, we'd need to use the key extractor prop */}

      <View style={styles.listZone}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => <GoalItem  
          onDelete={()=>removeGoalHandler(itemData.item.id)} 
          title={itemData.item.value} />}
      />
        </View>
{/*
      *All the states are mananged/implemented in app.tsx but are passed to components as props
      *Funtions are passed to components as props.function_name
      *Flatlist can contain components
      *itemData is return from data prop of FlatList and then rendered by being passed down to the component
      */}
      {/**
       * We could have used coursGoals.map((goal)=><Text >{goal}</Text>) where goal (every element of courseGoals) will be sent as an anonymous fct input
       */}
    </View>
  );
}
const styles = StyleSheet.create({
  //creates a JS object
  screen: {
    padding: 50,
    paddingTop:50,
    flexDirection:"column"
  },
  listItem: {
    padding: 10,
    backgroundColor: "#ccc",
    borderBottomColor: "black",
    borderWidth: 1,
    marginVertical: 6,
  },
  image: {
 flex: 1,
    resizeMode: 'cover',
  
  },
  listZone:{
    paddingTop:20,
    width: "100%"
  }

}
);
