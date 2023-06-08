import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Word from '../Components/Word';
import SearchBar from '../Components/SearchBar';
import Meaning from '../Components/Meaning';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from '../Components/Footer';
import AddWord from './AddWord';
import EditMeaning from './EditMeaning';

// Import the JSON data files
import AData from '../JsonData/A.json';
import BData from '../JsonData/B.json';
import CData from '../JsonData/C.json';
import DData from '../JsonData/D.json';
import EData from '../JsonData/E.json';
import FData from '../JsonData/F.json';
import GData from '../JsonData/G.json';
import HData from '../JsonData/H.json';
import IData from '../JsonData/I.json';
import JData from '../JsonData/J.json';
import KData from '../JsonData/K.json';
import LData from '../JsonData/L.json';
import MData from '../JsonData/M.json';
import NData from '../JsonData/N.json';
import OData from '../JsonData/O.json';
import PData from '../JsonData/P.json';
import QData from '../JsonData/Q.json';
import RData from '../JsonData/R.json';
import SData from '../JsonData/S.json';
import TData from '../JsonData/T.json';
import UData from '../JsonData/U.json';
import VData from '../JsonData/V.json';
import WData from '../JsonData/W.json';
import XData from '../JsonData/X.json';
import YData from '../JsonData/Y.json';
import ZData from '../JsonData/Z.json';

const HomeScreen = (params) => {
  const [searchWord, setSearchWord] = useState('');

  const selectFile = async (word) => {
    const storedData = await AsyncStorage.getItem(word);
    if (storedData) {
      console.log("Returning from assync storage ")
      return JSON.parse(storedData);
    }

    let filePath = '';

    switch (word) {
      case 'a':
        filePath = AData;
        break;
      case 'b':
        filePath = BData;
        break;
      case 'c':
        filePath = CData;
        break;
      case 'd':
        filePath = DData;
        break;
      case 'e':
        filePath = EData;
        break;
      case 'f':
        filePath = FData;
        break;
      case 'g':
        filePath = GData;
        break;
      case 'h':
        filePath = HData;
        break;
      case 'i':
        filePath = IData;
        break;
      case 'j':
        filePath = JData;
        break;
      case 'k':
        filePath = KData;
        break;
      case 'l':
        filePath = LData;
        break;
      case 'm':
        filePath = MData;
        break;
      case 'n':
        filePath = NData;
        break;
      case 'o':
        filePath = OData;
        break;
      case 'p':
        filePath = PData;
        break;
      case 'q':
        filePath = QData;
        break;
      case 'r':
        filePath = RData;
        break;
      case 's':
        filePath = SData;
        break;
      case 't':
        filePath = TData;
        break;
      case 'u':
        filePath = UData;
        break;
      case 'v':
        filePath = VData;
        break;
      case 'w':
        filePath = WData;
        break;
      case 'x':
        filePath = XData;
        break;
      case 'y':
        filePath = YData;
        break;
      case 'z':
        filePath = ZData;
        break;
    }

    if (filePath !== '') {
      console.log('filepath', filePath);
      const data = filePath;
      await AsyncStorage.setItem(word, JSON.stringify(data));
      return data;
    }

    return [];
  };

  function createObj(data) {
    let MeaningArray = [];
    let LaxialCatagory = [];
    for (let i = 0; i < data.length; i++) {
      let meaning = data[i].split(')');
      let newMeaning = meaning[1];
      for (let i = 2; i < meaning.length; i++) {
        newMeaning = newMeaning + ')' + meaning[i];
      }
      if (data[i].split(' (')[1].split(')')[0] !== '') {
        LaxialCatagory.push(data[i].split(' (')[1].split(')')[0]);
      }
      MeaningArray.push(newMeaning);
    }
    const obj = {
      word: data[0].split(' (')[0],
      LaxialCatagory: LaxialCatagory.filter(
        (value, index) => LaxialCatagory.indexOf(value) === index
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
        arr[m].split(' (')[0].toLowerCase().replace(/\s+/g, '')
      );
      if (res === 0) return m;
      if (res > 0) l = m + 1;
      else r = m - 1;
    }
    return -1;
  }

  const searchingAlgo = async (wordToSearch ='' ) => {
    console.log("SEarch word inside searching algo is ", searchWord)

    if (wordToSearch!=''){
    // setSearchWord(wordToSearch)
  



    console.log("Function Called ")
    
    const data = await selectFile(wordToSearch[0].toLowerCase());
    const index = binarySearch(data, wordToSearch);
    if (index === -1) {
      alert(`Word ${wordToSearch} not found`);
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

      const indexedWordArray = WordArray.map((meaning, idx) => {
        const position = data.indexOf(meaning); // Get the actual position in the asynchronous storage
        return `${meaning} --%${position}--% `;
      });

      params.SetDisplayData(createObj(indexedWordArray));
    }
    
  }
    
    if (searchWord === '') {
      return;
    }
    console.log("Function Called ")
    
    const data = await selectFile(searchWord[0].toLowerCase());
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

      const indexedWordArray = WordArray.map((meaning, idx) => {
        const position = data.indexOf(meaning); // Get the actual position in the asynchronous storage
        return `${meaning} --%${position}--% `;
      });

      params.SetDisplayData(createObj(indexedWordArray));
    }
    // setSearchWord("")
  };

  return (
    <View style={{ backgroundColor: '#4CAF50', height: '100%' }}>
      {/* <AddWord /> */}
      <View style={{ marginBottom: 20 }}>
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          handleSearch={searchingAlgo}
        />
        <Word word={params.word.word} LaxialCatagory={params.word.LaxialCatagory} />
        <Meaning 
          meaning={params.word.meaning} 
          word={params.word.word} 
          setSearchWord={setSearchWord} 
          searchWord={searchWord}
          handleSearch={searchingAlgo} 
          />
      </View>
    </View>
  );
};

export default HomeScreen;
