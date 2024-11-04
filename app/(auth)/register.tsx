// Ranking.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


const RANKING = [
  { "name": "Alice", "score": 95 },
  { "name": "Bob", "score": 85 },
  { "name": "Charlie", "score": 75 },
  { "name": "David", "score": 90 },
  { "name": "Eve", "score": 80 },
  { "name": "Frank", "score": 88 }
]
const Ranking = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('path_to_your/scores.json'); // Adjust the path as needed
        //const data = await response.json();
        const data = RANKING;
        // Sort scores in descending order and take the top 5
        const topScores = data.sort((a, b) => b.score - a.score).slice(0, 5);
        setScores(topScores);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
      <FlatList
        data={scores}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    color: '#ffffff',
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});


export default Ranking;
