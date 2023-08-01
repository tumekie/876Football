import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch data from the News API
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&category=sports&q=soccer&apiKey=25c985c530dc4cada1551de493ff7eec'
        );
        //console.log(response.data.articles);
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
    
    // Fetch data every 5 minutes (300000 milliseconds)
    const interval = setInterval(fetchNews, 300000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);

  }, []);

  // Handle article click
  const handleArticleClick = (url) => {
    // Open the article in a web browser
    Linking.openURL(url);
  };

  // Render each news article
  const renderArticle = ({ item }) => (
    <TouchableOpacity onPress={() => handleArticleClick(item.url)}>
      <View style={styles.articleContainer}>
        {item.urlToImage && (
          <Image source={{ uri: item.urlToImage }} style={styles.image} />
        )}
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>{item.publishedAt}</Text>
        {/* Add more details as needed */}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={articles}
      renderItem={renderArticle}
      keyExtractor={(item) => item.url}
    />
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default News;
