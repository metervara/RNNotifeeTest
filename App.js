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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import notifee, {
  IOSAuthorizationStatus,
  Importance,
} from '@notifee/react-native';

const App = () => {
  useEffect(() => {
    async function displayNotification() {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus >= IOSAuthorizationStatus.AUTHORIZED) {
        console.log('Has permission, Display a notification');
        await notifee.displayNotification({
          title: 'A notification',
          body: 'The notification body',
          ios: {
            critical: true,
            importance: Importance.HIGH,
          },
        });
        console.log('Displayed notification?');
      } else {
        console.log('User declined permissions');
      }
    }

    displayNotification();
  }, []);

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
