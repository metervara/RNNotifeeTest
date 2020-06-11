/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import notifee, {
  IOSAuthorizationStatus,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

const App: () => React$Node = () => {
  useEffect(() => {
    requestUserPermission().then(result => {
      //
    });

    return function cleanup() {
      //
    };
  });

  async function onDisplayNotification() {
    const title = 'Notification Title';
    const body = 'Main body content of the notification';

    if (Platform.OS === 'android') {
      const channelId = await notifee.createChannel({
        id: 'important',
        name: 'Important Notifications',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
      });

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
        },
      });
    } else {
      const foregroundPresentationOptions = {
        alert: true,
        badge: true,
        sound: true,
      };

      await notifee.displayNotification({
        title,
        body,
        ios: {
          critical: true,
          importance: AndroidImportance.HIGH, // Documentation has Importance.HIGH which does not exist
          foregroundPresentationOptions,
        },
      });
    }
  }

  async function requestUserPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= IOSAuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }

    return settings;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Notifee test</Text>
              <Button
                title="Display Notification"
                onPress={() => onDisplayNotification()}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default App;
