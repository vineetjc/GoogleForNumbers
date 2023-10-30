import React from 'react';
import {Pressable, Text, View} from 'react-native';

const Button = props => {
  const {onPress, buttonText} = props;
  return (
    <Pressable
      hitSlop={{bottom: 20, left: 20, right: 20, top: 20}}
      style={({pressed}) => {
        return {opacity: pressed ? 0.5 : 1.0};
      }}
      onPress={onPress}>
      <View style={{padding: 10, backgroundColor: '#F8F8F8', borderRadius: 8}}>
        <Text style={{color: 'black'}}>{buttonText}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
