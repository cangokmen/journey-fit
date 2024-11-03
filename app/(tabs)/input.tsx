import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function InputScreen() {
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('5');
  const [thirdInput, setThirdInput] = useState('5');
  const [fourthInput, setFourthInput] = useState('5');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);

  const numbers = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  const validateInputs = () => {
    const weight = parseFloat(firstInput);
    if (isNaN(weight)) {
      Alert.alert('Error', 'Q1: Weight must be a valid number.');
      return false;
    }
    return true;
  };

  const saveDataToSecureStore = async () => {
    if (!validateInputs()) return;

    try {
      const existingData = await SecureStore.getItemAsync('inputDataArray');
      const dataArray = existingData ? JSON.parse(existingData) : [];

      const date = new Date().toISOString().split('T')[0];
      const newEntry = [date, firstInput, secondInput, thirdInput, fourthInput];
      dataArray.push(newEntry);

      await SecureStore.setItemAsync('inputDataArray', JSON.stringify(dataArray));
      Alert.alert('Success', 'Data saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  const clearDataFromSecureStore = async () => {
    try {
      const presetData = [
        ["2024-09-19", "70", "2", "3", "6"],
        ["2024-09-20", "71", "2", "3", "6"],
        ["2024-09-21", "71", "2", "3", "6"],
        ["2024-09-22", "71", "2", "3", "6"],
        ["2024-09-23", "70", "2", "3", "6"],
        ["2024-09-24", "69", "2", "3", "6"],
        ["2024-09-25", "67", "2", "3", "6"],
        ["2024-09-26", "66", "2", "3", "6"],
        ["2024-09-27", "63", "2", "1", "6"],
        ["2024-09-28", "62", "2", "1", "6"],
        ["2024-09-29", "63", "2", "1", "6"],
        ["2024-09-30", "62", "2", "1", "6"],
        ["2024-09-31", "61", "2", "1", "6"],
        ["2024-10-01", "60.5", "2", "1", "6"],
        ["2024-10-02", "60", "7", "2", "6"]
      ];

      await SecureStore.setItemAsync('inputDataArray', JSON.stringify(presetData));
      Alert.alert('Success', 'Data reset with preset values!');
    } catch (error) {
      Alert.alert('Error', 'Failed to reset data');
    }
  };

  const openPicker = (picker) => {
    setCurrentPicker(picker);
    setModalVisible(true);
  };

  const handleSelect = (value) => {
    if (currentPicker === 'secondInput') setSecondInput(value);
    if (currentPicker === 'thirdInput') setThirdInput(value);
    if (currentPicker === 'fourthInput') setFourthInput(value);
    setModalVisible(false);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.headerText}>JourneyFit</Text>
        <View style={styles.box}>
          <Text style={styles.text}>New Entry</Text>

          <Text style={styles.label}>Q1: Update your weight:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your weight"
            value={firstInput}
            onChangeText={setFirstInput}
            keyboardType="numeric"
            editable={true}
          />

          <Text style={styles.label}>Q2: Rate your eating (1 to 10):</Text>
          <TouchableOpacity style={styles.picker} onPress={() => openPicker('secondInput')}>
            <Text style={styles.pickerText}>{secondInput}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Q3: Rate your physical activity (1 to 10):</Text>
          <TouchableOpacity style={styles.picker} onPress={() => openPicker('thirdInput')}>
            <Text style={styles.pickerText}>{thirdInput}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Q4: Rate how you feel (1 to 10):</Text>
          <TouchableOpacity style={styles.picker} onPress={() => openPicker('fourthInput')}>
            <Text style={styles.pickerText}>{fourthInput}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneButton} onPress={saveDataToSecureStore}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.clearButton} onPress={clearDataFromSecureStore}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>

          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={numbers}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.modalItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  box: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#EDFADB',
  },
  text: {
    fontSize: 30,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    color: '#666',
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  picker: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  doneButton: {
    backgroundColor: '#00bf63',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 18,
    textAlign: 'center',
  },
  closeButton: {
    textAlign: 'center',
    color: '#00bf63',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C91B5',
    marginVertical: 16,
    textAlign: 'center',
  }  
});
