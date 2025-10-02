import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function UsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(() => setError("Error al cargar usuarios"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Text>Cargando usuarios...</Text>;
  if (error) return <Text style={{ color: 'red' }}>{error}</Text>;

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Posts", { userId: item.id })}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.email}</Text>
          <Text>{item.address.city}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#f2f2f2', 
    padding: 10, 
    margin: 5, 
    borderRadius: 5 
  },
  name: { 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});
