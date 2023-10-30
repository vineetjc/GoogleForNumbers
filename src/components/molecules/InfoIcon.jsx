import React from 'react';
import {View, Pressable, Image, StyleSheet} from 'react-native';

const InfoIcon = props => {
  return (
    <View style={styles.infoIconStyle}>
      <Pressable
        hitSlop={{bottom: 20, left: 20, right: 20, top: 20}}
        style={({pressed}) => {
          return {opacity: pressed ? 0.5 : 1.0};
        }}
        onPress={props.onPress}>
        <Image
          source={require('../../assets/info-icon.png')}
          style={styles.infoIcon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  infoIconStyle: {position: 'absolute', top: 20, right: 20},
  infoIcon: {height: 20, width: 20},
});

export default InfoIcon;
