import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function AttractionCard({ item, onPress, onToggleFavorite, favorite }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(item)}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.region}>{item.region}</Text>
        <Text style={styles.short}>{item.short}</Text>

        <View style={styles.actions}>
          <Pressable onPress={() => onToggleFavorite(item.id)} style={styles.button}>
            <Text style={styles.buttonText}>{favorite ? 'Remover favorito' : 'Favoritar'}</Text>
          </Pressable>
          <Pressable onPress={() => onPress(item)} style={[styles.button, styles.more]}>
            <Text style={styles.buttonText}>Mais informações</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }
  },
  image: {
    width: 110,
    height: 110
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  region: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  short: {
    fontSize: 13,
    marginTop: 6
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between'
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1a73e8'
  },
  buttonText: {
    fontSize: 13,
    color: '#1a73e8'
  },
  more: {
    borderColor: '#333',
    marginLeft: 8
  }
});
