import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';
import AppStance from 'react-native-appstance';

export default function App() {
  const [userID, setUserID] = useState('');
  const [remoteConfig, setRemoteConfig] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeSDK = async () => {
    try {
      await AppStance.initialize(
          'your-api-key-here', // Replace with your actual API key
          true,
          null,
          null,
          null,
          true
      );
      setIsInitialized(true);
      Alert.alert('Success', 'AppStance SDK initialized successfully');
    } catch (error) {
      Alert.alert('Error', `Failed to initialize SDK: ${error.message}`);
    }
  };

  const trackRevenueEvent = async () => {
    try {
      await AppStance.trackExternalRevenueEvent('test_purchase', 9.99, 'USD');
      Alert.alert('Success', 'Revenue event tracked successfully');
    } catch (error) {
      Alert.alert('Error', `Failed to track revenue event: ${error.message}`);
    }
  };

  const trackNonRevenueEvent = async () => {
    try {
      await AppStance.trackNonRevenueEventOnce('user_signup');
      Alert.alert('Success', 'Non-revenue event tracked successfully');
    } catch (error) {
      Alert.alert('Error', `Failed to track non-revenue event: ${error.message}`);
    }
  };

  const getUserID = async () => {
    try {
      const id = await AppStance.getAppStanceUserID();
      setUserID(id);
    } catch (error) {
      Alert.alert('Error', `Failed to get user ID: ${error.message}`);
    }
  };

  const getRemoteConfig = async () => {
    try {
      const config = await AppStance.getRemoteConfigJSONString();
      setRemoteConfig(config);
    } catch (error) {
      Alert.alert('Error', `Failed to get remote config: ${error.message}`);
    }
  };

  return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>AppStance SDK Test</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Initialization</Text>
            <Button title="Initialize SDK" onPress={initializeSDK} />
            <Text style={styles.status}>
              Status: {isInitialized ? 'Initialized' : 'Not Initialized'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tracking Events</Text>
            <Button title="Track Revenue Event" onPress={trackRevenueEvent} />
            <View style={styles.spacer} />
            <Button title="Track Non-Revenue Event" onPress={trackNonRevenueEvent} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Get Data</Text>
            <Button title="Get User ID" onPress={getUserID} />
            {userID ? <Text style={styles.result}>User ID: {userID}</Text> : null}

            <View style={styles.spacer} />
            <Button title="Get Remote Config" onPress={getRemoteConfig} />
            {remoteConfig ? (
                <Text style={styles.result}>Remote Config: {remoteConfig}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  result: {
    marginTop: 10,
    fontSize: 14,
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderRadius: 5,
  },
  spacer: {
    height: 10,
  },
});