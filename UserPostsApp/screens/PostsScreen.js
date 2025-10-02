import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function PostsScreen({ route }) {
  const { userId } = route.params;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(res => setPosts(res.data))
      .catch(() => setError("Error al cargar posts"))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Text>Cargando posts...</Text>;
  if (error) return <Text style={{ color: 'red' }}>{error}</Text>;

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#e6f7ff', 
    padding: 10, 
    margin: 5, 
    borderRadius: 5 
  },
  title: { 
    fontWeight: 'bold', 
    marginBottom: 5 
  }
});
