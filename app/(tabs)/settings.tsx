import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SettingsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedName = await SecureStore.getItemAsync('name');
        const savedAge = await SecureStore.getItemAsync('age');
        const savedWeight = await SecureStore.getItemAsync('weight');
        const savedHeight = await SecureStore.getItemAsync('height');
        const savedEmail = await SecureStore.getItemAsync('email');
        const savedPhone = await SecureStore.getItemAsync('phone');
        const savedGender = await SecureStore.getItemAsync('gender');

        if (savedName) setName(savedName);
        if (savedAge) setAge(savedAge);
        if (savedWeight) setWeight(savedWeight);
        if (savedHeight) setHeight(savedHeight);
        if (savedEmail) setEmail(savedEmail);
        if (savedPhone) setPhone(savedPhone);
        if (savedGender) setGender(savedGender);
      } catch (error) {
        console.log('Error loading data from SecureStore:', error);
      }
    };

    loadSavedData();
  }, []);

  const handleSave = async () => {
    try {
      await SecureStore.setItemAsync('name', name);
      await SecureStore.setItemAsync('age', age);
      await SecureStore.setItemAsync('weight', weight);
      await SecureStore.setItemAsync('height', height);
      await SecureStore.setItemAsync('email', email);
      await SecureStore.setItemAsync('phone', phone);
      await SecureStore.setItemAsync('gender', gender);
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data to SecureStore:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 50,
    color: '#4C91B5',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
});

export default SettingsPage;
