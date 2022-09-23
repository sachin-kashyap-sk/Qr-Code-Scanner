/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Button,
  ScrollView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(position => {
  console.log(position);
});

const Scaner = () => {
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState();

  const onSuccess = e => {
    setResult(e.data);
    console.log(e.data);
    Geolocation.getCurrentPosition(info => console.log(info));
    setScan(false);
  };

  const startScan = () => {
    setScan(true);
    setResult();
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            {result && (
              <View style={styles.sectionContainer}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '900',
                    color: '#000000',
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}>
                  {result}
                </Text>
              </View>
            )}
            {!scan && (
              <View
                style={{
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingTop: '60%',
                }}>
                <Button title="Start Scan" color="#000" onPress={startScan} />
              </View>
            )}

            {scan && (
              <View style={styles.sectionContainer}>
                <QRCodeScanner
                  reactivate={true}
                  showMarker={true}
                  ref={node => {
                    this.scanner = node;
                  }}
                  onRead={onSuccess}
                  flashMode={RNCamera.Constants.FlashMode.off}
                  topContent={
                    <Text style={styles.centerText}> Scan Your QR Code!</Text>
                  }
                  bottomContent={
                    <TouchableOpacity
                      style={styles.buttonTouchable}
                      onPress={() => setScan(false)}>
                      <Text style={styles.buttonText}>Got IT</Text>
                    </TouchableOpacity>
                  }
                />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'red',
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
  },

  centerText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
  },

  buttonText: {
    fontSize: 25,
    fontWeight: '800',
    color: 'blue',
  },
  buttonTouchable: {
    paddingTop: 100,
  },
});

export default Scaner;
