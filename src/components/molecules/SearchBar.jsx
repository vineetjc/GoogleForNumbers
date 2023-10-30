import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Gap from '../atoms/Gap';

import {pageNames} from '../../util/constants';

const windowWidth = Dimensions.get('window').width;

const SearchBar = props => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchIconAndText}>
        {/* on home page, display simple search icon at the left side */}
        {props.page === pageNames.HOME ? (
          <>
            <Image
              source={require('../../assets/search-icon.png')}
              style={styles.searchBarIcons}
            />
            <Gap horizontal value={15} />
          </>
        ) : null}
        <TextInput
          style={styles.textInput}
          onChangeText={text => props.onChangeText(text)}
          value={props.query}
          keyboardType="numeric"
          multiline
        />
      </View>
      {/* on result pages, pressable search icon at the right side */}
      <View style={styles.rightSideIcons}>
        {props.page === pageNames.RESULTS ? (
          <>
            <Gap horizontal value={10} />
            <View style={styles.verticalIconSeparator} />
            <Gap horizontal value={10} />
            <Pressable
              hitSlop={{bottom: 20, left: 20, right: 20, top: 20}}
              style={({pressed}) => {
                return {opacity: pressed ? 0.5 : 1.0};
              }}
              onPress={props.onSearchBarIconClick}>
              <Image
                source={require('../../assets/search-icon.png')}
                style={styles.searchBarIcons}
              />
            </Pressable>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    width: windowWidth - 32,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  textInput: {
    width: windowWidth - 32 - 150,
    justifyContent: 'center',
  },
  searchBarIcons: {height: 20, width: 20},
  searchIconAndText: {flexDirection: 'row', alignItems: 'center'},
  rightSideIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verticalIconSeparator: {width: 1, height: 30, backgroundColor: '#D8D8D8'},
});

export default SearchBar;
