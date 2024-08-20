import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import { searchMovies } from '../backend/imdbApi'; // Ensure this path is correct

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await searchMovies(query);
      setMovies(response.results || []); // Access `results` from the response
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a movie"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()} // Ensure `id` is a string
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.poster}
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No movies found.</Text>}
        contentContainerStyle={movies.length === 0 ? styles.emptyList : {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  movieItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 225,
  },
  movieTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default SearchPage;
