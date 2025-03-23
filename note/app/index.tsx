import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Index() {
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<string[]>([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTaskItems([...taskItems, task]);
      setTask('');
    }
  };

  const handleDeleteTask = (index: number) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "OK", 
          onPress: () => {
            const itemsCopy = [...taskItems];
            itemsCopy.splice(index, 1);
            setTaskItems(itemsCopy);
          } 
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdateTask = (index: number, newTask: string) => {
    const itemsCopy = [...taskItems];
    itemsCopy[index] = newTask;
    setTaskItems(itemsCopy);
  };

  

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Todo App</Text>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => (
            <View key={index} style={styles.taskContainer}>
              <TextInput
                style={styles.item}
                value={item}
                onChangeText={(text) => handleUpdateTask(index, text)}
              />
              
              <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                <Text style={styles.deleteText}>❌</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={text => setTask(text)}
        placeholder={'Write a task'}
        onSubmitEditing={handleAddTask}
      />
      <TouchableOpacity onPress={handleAddTask}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  items: {
    marginTop: 30,
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
  },
  item: {
    flex: 1,
    padding: 10,
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 10,
  },
  updateButton: {
    marginLeft: 10,
    padding: 5,
  },
 
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    marginTop: 20,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginTop: 10,
  },
  addText: {},
});

