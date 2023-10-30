import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// components
import Gap from './atoms/Gap';
import SearchBar from './molecules/SearchBar';
import FilterTabs from './molecules/FilterTabs';
import DisplayContentByType from './molecules/DisplayContentByType';
import InfoIcon from './molecules/InfoIcon';
import InfoOverlay from './molecules/InfoOverlay';

// util
import { textWithOnlyDigits } from '../util/searchBarUtil';
import { pageNames, GENERIC_ERROR_OBJECT } from '../util/constants';
import { getNumberInfoAPI } from '../api/numbersapi';

const windowWidth = Dimensions.get('window').width;

function SearchResults({ route, navigation }) {
  const { result } = route.params;
  const [query, setQuery] = useState(result.number?.toString());
  const [data, setData] = useState(result);
  const [infoOverlay, toggleInfoOverlay] = useState(false);

  if (result.number == null) {
    setData(GENERIC_ERROR_OBJECT);
  }

  const onPressSearch = async () => {
    if (query === '') {
      return;
    }
    const numbersAPIResponse = await getNumberInfoAPI(query, 'trivia');
    Keyboard.dismiss();
    setData(numbersAPIResponse);
  };

  const onChangeText = (input) => {
    setQuery(textWithOnlyDigits(input));
  };

  const onTabSwitch = async (selectedTab) => {
    // The button is supposed to serve for the same number that it first loaded the fact for.
    // It is possible that user may type new number without submitting on this page, and still trigger
    // for a new fact below. Hence, refers to data.number instead of query.

    // if clicked same tab no need to make another API call
    if (data.type === selectedTab) {
      return;
    }
    const numbersAPIResponse = await getNumberInfoAPI(data.number, selectedTab);
    setData(numbersAPIResponse);
  };

  const fetchNewFactForSameQuery = async () => {
    // The button is supposed to serve for the same number that it first loaded the fact for.
    // It is possible that user may type new number without submitting on this page, and still trigger
    // for a new fact below. Hence, refers to data.number instead of query.

    const numbersAPIResponse = await getNumberInfoAPI(data.number, data.type);
    setData(numbersAPIResponse);
  };

  const fetchNewRandomFact = async () => {
    const numbersAPIResponse = await getNumberInfoAPI('random', 'trivia');
    setData(numbersAPIResponse);
    setQuery('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.searchResultsPage}
      >
        <Gap value={20} />
        {/* Home Icon + Search Bar */}
        <View>
          <View style={styles.pageHeader}>
            <Pressable
              hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
              style={({ pressed }) => {
                return { opacity: pressed ? 0.5 : 1.0 };
              }}
              onPress={() => navigation.popToTop()}
            >
              <Image source={require('../assets/home-icon.png')} style={styles.homeIcon} />
            </Pressable>
            <Gap horizontal value={10} />
            <Image
              source={require('../assets/google-for-numbers.png')}
              style={styles.homePageLogo}
            />
            <InfoIcon onPress={() => toggleInfoOverlay(!infoOverlay)} />
          </View>
          <Gap value={20} />
          <SearchBar
            query={query}
            onChangeText={onChangeText}
            page={pageNames.RESULTS}
            onSearchBarIconClick={onPressSearch}
          />
        </View>

        <Gap value={20} />

        {/* Filter by type */}
        <FilterTabs
          tabs={['trivia', 'math', 'year']}
          currentTab={data.type}
          onTabSwitch={onTabSwitch}
        />

        {/* Content of the page (by type) */}
        <DisplayContentByType
          onRefresh={fetchNewFactForSameQuery}
          onRandom={fetchNewRandomFact}
          data={data}
        />
        {infoOverlay ? (
          <InfoOverlay toggleInfoOverlay={() => toggleInfoOverlay(!infoOverlay)} />
        ) : null}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  homeIcon: {
    height: (windowWidth / 2 - 100) * (710 / 1952),
    width: (windowWidth / 2 - 100) * (710 / 1952),
  },
  homePageLogo: {
    height: (windowWidth / 2 - 100) * (710 / 1952),
    width: windowWidth / 2 - 100,
  },
  searchResultsPage: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pageHeader: { flexDirection: 'row' },
});

export default SearchResults;
