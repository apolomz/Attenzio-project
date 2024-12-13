import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const [sesiones, setSesiones] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const fetchSesiones = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/sesiones/');
      setSesiones(response.data);
    } catch (error) {
      console.error('Error al cargar sesiones:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSesiones();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchSesiones();
  }, []);

  const renderSesion = ({ item }) => (
    <TouchableOpacity
      style={styles.sesionCard}
      onPress={() => navigation.navigate('Scanner', { sesionId: item.id })}
    >
      <Text style={styles.cursoName}>{item.curso.nombre}</Text>
      <Text style={styles.sesionInfo}>
        {new Date(item.fecha).toLocaleDateString()} - {item.hora_inicio}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenido, {user?.first_name}</Text>
      <Text style={styles.subtitle}>Sesiones de hoy</Text>
      <FlatList
        data={sesiones}
        renderItem={renderSesion}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  sesionCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cursoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sesionInfo: {
    color: '#666',
    marginTop: 5,
  },
});