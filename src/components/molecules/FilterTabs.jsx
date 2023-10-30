import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';

import Gap from '../atoms/Gap';

import {toTitleCase} from '../../util/util';

const windowWidth = Dimensions.get('window').width;

const FilterTabs = props => {
  const getImageIcon = type => {
    switch (type) {
      case 'trivia':
        return require('../../assets/trivia-icon.png');
      case 'math':
        return require('../../assets/math-icon.png');
      case 'year':
        return require('../../assets/year-icon.png');
    }
  };

  return (
    <View>
      <View style={styles.tabsContainer}>
        {props.tabs.map(tab => (
          <Pressable
            hitSlop={{bottom: 20, left: 20, right: 20, top: 20}}
            style={({pressed}) => {
              return {opacity: pressed ? 0.5 : 1.0};
            }}
            onPress={() => props.onTabSwitch(tab)}
            key={tab}
            disabled={props.currentTab==='error'}>
            <View
              style={[
                styles.tab,
                props.currentTab === tab ? styles.currentTab : {},
              ]}>
              <Image
                source={getImageIcon(tab)}
                style={[
                  styles.tabIcon,
                  props.currentTab === tab ? styles.currentTabIcon : {},
                ]}
              />
              <Gap horizontal value={4} />
              <Text
                style={[
                  styles.tabText,
                  props.currentTab === tab ? styles.currentTabText : {},
                ]}>
                {toTitleCase(tab)}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={styles.horizontalLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {flexDirection: 'row', justifyContent: 'space-evenly'},
  tabText: {color: 'grey', fontSize: 18},
  tab: {flexDirection: 'row', padding: 10},
  currentTab: {borderBottomWidth: 2, borderColor: '#4285F4'},
  currentTabText: {color: '#4285F4'},
  tabIcon: {height: 20, width: 20, tintColor: 'grey'},
  currentTabIcon: {tintColor: '#4285F4'},
  horizontalLine: {width: windowWidth, backgroundColor: '#D8D8D8', height: 1},
});

export default FilterTabs;
