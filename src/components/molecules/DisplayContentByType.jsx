import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

import Button from '../atoms/Button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DisplayContentByType = (props) => {
  const getImageByType = (type) => {
    switch (type) {
      case 'trivia':
        return require('../../assets/fun-fact.png');
      case 'math':
        return require('../../assets/math-book.png');
      case 'year':
        return require('../../assets/calendar-img.png');
      default:
        return require('../../assets/error-page.png');
    }
  };
  return (
    <View style={styles.displayContent}>
      <Image
        source={getImageByType(props.data.type)}
        style={{ width: windowWidth - 32 - 100, height: windowWidth - 32 - 100 }}
      />
      <Text style={{ fontSize: 24 }}>{props.data.text}</Text>

      <View style={styles.buttonsContainer}>
        {props.data.type !== 'error' ? (
          <Button buttonText="Another One" onPress={props.onRefresh} />
        ) : null}
        <Button buttonText={props.data.type === 'error' ? "I Dare!" : "Throw The Dice!"} onPress={props.onRandom} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  displayContent: {
    flex: 1,
    width: windowWidth - 32,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: windowWidth - 32,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default DisplayContentByType;
