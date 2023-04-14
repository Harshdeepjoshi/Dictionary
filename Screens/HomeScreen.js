import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import Word from '../Components/Word';
import SearchBar from '../Components/SearchBar';
import Meaning from '../Components/Meaning';
import Footer from '../Components/Footer';
import AddWord from './AddWord';
import EditMeaning from './EditMeaning';
const HomeScreen = params => {
  const [searchWord, setSearchWord] = useState('');
  function selectFile(word) {
    switch (word) {
      case 'a':
        return require('../JsonData/A.json');
        break;
      case 'b':
        return require('../JsonData/B.json');
        break;
      case 'c':
        return require('../JsonData/C.json');
        break;
      case 'd':
        return require('../JsonData/D.json');
        break;
      case 'e':
        return require('../JsonData/E.json');
        break;
      case 'f':
        return require('../JsonData/F.json');
        break;
      case 'g':
        return require('../JsonData/G.json');
        break;
      case 'h':
        return require('../JsonData/H.json');
        break;
      case 'i':
        return require('../JsonData/I.json');
        break;
      case 'j':
        return require('../JsonData/J.json');
        break;
      case 'k':
        return require('../JsonData/K.json');
        break;
      case 'l':
        return require('../JsonData/L.json');
        break;
      case 'm':
        return require('../JsonData/M.json');
        break;
      case 'n':
        return require('../JsonData/N.json');
        break;
      case 'o':
        return require('../JsonData/O.json');
        break;
      case 'p':
        return require('../JsonData/P.json');
        break;
      case 'q':
        return require('../JsonData/Q.json');
        break;
      case 'r':
        return require('../JsonData/R.json');
        break;
      case 's':
        return require('../JsonData/S.json');
        break;
      case 't':
        return require('../JsonData/T.json');
        break;
      case 'u':
        return require('../JsonData/U.json');
        break;
      case 'v':
        return require('../JsonData/V.json');
        break;
      case 'w':
        return require('../JsonData/W.json');
        break;
      case 'x':
        return require('../JsonData/X.json');
        break;
      case 'y':
        return require('../JsonData/Y.json');
        break;
      case 'z':
        return require('../JsonData/Z.json');
        break;
    }
  }
  function createObj(data) {
    let MeaningArray = [];
    let LaxialCatagory = [];
    for (let i = 0; i < data.length; i++) {
      let meaning = data[i].split(')');
      let newMeaning = meaning[1];
      for (let i = 2; i < meaning.length; i++) {
        newMeaning = newMeaning + ')' + meaning[i];
      }
      if (data[i].split(' (')[1].split(')')[0] != '') {
        LaxialCatagory.push(data[i].split(' (')[1].split(')')[0]);
      }
      MeaningArray.push(newMeaning);
    }
    const obj = {
      word: data[0].split(' (')[0],
      LaxialCatagory: LaxialCatagory.filter(
        (value, index) => LaxialCatagory.indexOf(value) === index,
      ),
      meaning: MeaningArray,
    };
    return obj;
  }

  function binarySearch(arr, x) {
    x = x.toLowerCase().replace(/\s+/g, '');
    let l = 0,
      r = arr.length - 1;
    while (l <= r) {
      let m = l + Math.floor((r - l) / 2);
      let res = x.localeCompare(
        arr[m].split(' (')[0].toLowerCase().replace(/\s+/g, ''),
      );
      if (res == 0) return m;
      if (res > 0) l = m + 1;
      else r = m - 1;
    }
    return -1;
  }

  const searchingAlgo = wordToSearch => {
    if (searchWord === '') {
      return;
    }

    const data = selectFile(searchWord[0].toLowerCase());
    const index = binarySearch(data, searchWord);
    if (index === -1) {
      alert(`Word ${searchWord} not found`);
    } else {
      let word = data[index].split(' (')[0].toLowerCase();
      let WordArray = [];
      let low = index;
      let up = index;

      while (low > 0 && data[low - 1].split(' (')[0].toLowerCase() === word) {
        low--;
      }

      while (
        up < data.length - 1 &&
        data[up + 1].split(' (')[0].toLowerCase() === word
      ) {
        up++;
      }

      for (let i = low; i <= up; i++) {
        WordArray.push(data[i]);
      }

      params.SetDisplayData(createObj(WordArray));
    }
  };
  return (
    <View style={{backgroundColor: '#4CAF50', height: '100%'}}>
      {/* <AddWord /> */}
      <View style={{marginBottom: 20}}>
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          handleSearch={searchingAlgo}
        />
        <Word
          word={params.word.word}
          LaxialCatagory={params.word.LaxialCatagory}
        />
        <Meaning meaning={params.word.meaning} />
      </View>
    </View>
  );
};

export default HomeScreen;
