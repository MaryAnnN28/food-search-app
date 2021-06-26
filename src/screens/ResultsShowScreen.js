import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);

  console.log(result); 
  const id = navigation.getParam('id');

  
  
  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id); 
  }, []);
  
  if (!result) {
    return null; 
  }

  return (
    <View style={styles.pageStyle}>
      <Text style={styles.header}>{result.name}</Text>
      <Text style={styles.info}>Rating: {result.rating}</Text>
      <Text style={styles.info}>Price: {result.price}</Text>
      <Text style={styles.info}>Reviews: {result.review_count}</Text>
      <Text style={styles.info}>Phone: {result.display_phone}</Text>
      <View>
        <Text style={styles.info}>
          Services: 
        </Text>
        <FlatList
          // horizontal
          data={result.transactions}
          style={styles.infoList}
          keyExtractor={(transaction) => transaction}
          renderItem={({ item }) => {
            return <Text style={styles.infoDetails}>{item}</Text>
          }}
        />

      </View>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />
        }}
      />
    </View>
  );
}; 

const styles = StyleSheet.create({
  pageStyle: {
    marginTop: 5,
    justifyContent: 'center',
    flexDirection: 'column'
  }, 
  image: {
    height: 200,
    width: 300,
    marginVertical: 5,
    alignSelf: 'center'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'center'
  },
  info: {
    textAlign: 'left',
    marginLeft: 70
  },
  infoList: {
    marginLeft: 70,
    flexDirection: 'column'
  },
  infoDetails: {
    paddingHorizontal: 70
  }
});

export default ResultsShowScreen; 