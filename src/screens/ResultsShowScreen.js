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
      <Text>Rating:{result.rating}</Text>
      <Text>Reviews: {result.review_count}</Text>
      <Text>Phone: {result.display_phone}</Text>
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
    flexDirection: 'column',
    alignItems: 'center'
  }, 
  image: {
    height: 200,
    width: 300,
    marginVertical: 5, 
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  }
});

export default ResultsShowScreen; 