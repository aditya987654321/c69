import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    }
  }

  getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        /*status === 'granted' is true when user has granted permissions
        status === 'granted' is false when user has not granted the permissions */

        hasCameraPermissions: status === 'granted',
        buttonState: 'clicked',
        scanned: false
    })
  }

handleBarCodeScaned=async({type,data})=>{
  this.setState({
    scanned: true,
    scannedData: data, 
    buttonState: 'normal',
  })
}

  render() {
    console.log(this.state)
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
      if (buttonState==='clicked' && hasCameraPermissions) {
        return(
          <BarCodeScanner
          onBarCodeScanned={scanned?undefined:this.handleBarCodeScaned}
          style={StyleSheet.absoluteFillObject}
          />
        )
      }
      else if (buttonState==='normal') {
        return(
          <View style={styles.container}>
            <Text style={styles.displayText}>
              {hasCameraPermissions===true?this.state.scannedData:"request for permission"}
            </Text>
            <TouchableOpacity
            onPress={()=>{
              this.getCameraPermissions()}
            }
            style={styles.scanButton}>
              <Text style={styles.buttonText}>Scan Barcode</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline',
    },
    scanButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10,
    },
    buttonText:{
      fontSize: 20,
    }
  })  