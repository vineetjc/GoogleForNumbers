import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InfoOverlay = props => {
  return (
    <TouchableWithoutFeedback onPress={props.toggleInfoOverlay}>
      <View style={styles.translucent}>
        <View style={styles.infoCard}>
          <Text>
            Welcome to 'Google For Numbers'. This is Google, but only for
            numbers - because the world wouldn't exist without numbers (or would
            it, since man made numbers?)
          </Text>

          <Text>
            How To Use: enter a number to learn more about the following-{' '}
          </Text>
          <View>
            <Text>1. Trivia</Text>
            <Text>2. Math fact </Text>
            <Text>3. Year </Text>
          </View>
          <Text>Powered by NumbersAPI.com</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  translucent: {
    height: windowHeight,
    width: '100%',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    height: windowWidth - 100,
    width: windowWidth - 100,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'space-evenly',
    padding: 16,
  },
});

export default InfoOverlay;
