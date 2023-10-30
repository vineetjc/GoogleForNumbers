import React from 'react';
import {View} from 'react-native';

const Gap = props => {
  return (
    <View
      style={props.horizontal ? {width: props.value} : {height: props.value}}
    />
  );
};

export default Gap;
