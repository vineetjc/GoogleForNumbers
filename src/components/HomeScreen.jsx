import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

// components
import Button from './atoms/Button';
import Gap from './atoms/Gap';
import SearchBar from './molecules/SearchBar';
import InfoOverlay from './molecules/InfoOverlay';
import InfoIcon from './molecules/InfoIcon';

// utils
import {getNumberInfoAPI} from '../api/numbersapi';
import {textWithOnlyDigits} from '../util/searchBarUtil';
import {pageNames} from '../util/constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeScreen({route, navigation}) {
  const [query, setQuery] = useState('');
  const [infoOverlay, toggleInfoOverlay] = useState(false);
  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      setQuery('');
    }
  }, [focus]);

  const onPressSearch = async () => {
    if (query === '') {
      return;
    }
    const numbersAPIResponse = await getNumberInfoAPI(query, 'trivia');
    setQuery('');
    Keyboard.dismiss();
    navigation.navigate(pageNames.RESULTS, {result: numbersAPIResponse});
  };

  const onRandomSearch = async () => {
    const numbersAPIResponse = await getNumberInfoAPI('random', 'trivia');
    setQuery('');
    Keyboard.dismiss();
    navigation.navigate(pageNames.RESULTS, {result: numbersAPIResponse});
  };

  const onChangeText = input => {
    setQuery(textWithOnlyDigits(input));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.homePageContainer}>
        <InfoIcon onPress={() => toggleInfoOverlay(!infoOverlay)} />
        <Gap value={windowHeight / 5} />

        {/* Home Page Logo */}
        <Image
          source={require('../assets/google-for-numbers.png')}
          style={styles.homePageLogo}
        />

        {/* Search Bar + buttons */}
        <View>
          <SearchBar
            query={query}
            onChangeText={onChangeText}
            page={pageNames.HOME}
          />
          <Gap value={20} />
          <View style={styles.buttonsContainer}>
            <Button buttonText="Enlighten Me" onPress={onPressSearch} />
            <Button buttonText="I'm Feeling Lucky" onPress={onRandomSearch} />
          </View>
        </View>

        <Gap value={windowHeight / 5} />
        {infoOverlay ? (
          <InfoOverlay
            toggleInfoOverlay={() => toggleInfoOverlay(!infoOverlay)}
          />
        ) : null}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  homePageLogo: {
    height: (windowWidth - 32 - 100) * (710 / 1952),
    width: windowWidth - 32 - 100,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: windowWidth - 32,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default HomeScreen;
