import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  Modal,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AttractionCard from './components/AttractionCard';
import { ATTRACTIONS } from './data/attractions';

export default function App() {
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [query, setQuery] = useState('');

  // filtro por busca simples
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ATTRACTIONS;
    return ATTRACTIONS.filter(
      a =>
        a.name.toLowerCase().includes(q) ||
        a.region.toLowerCase().includes(q) ||
        a.short.toLowerCase().includes(q)
    );
  }, [query]);

  function openDetails(item) {
    setSelected(item);
  }

  function closeDetails() {
    setSelected(null);
  }

  function toggleFavorite(id) {
    setFavorites(prev => {
      const copy = { ...prev };
      if (copy[id]) delete copy[id];
      else copy[id] = true;
      return copy;
    });
  }

  function renderItem({ item }) {
    return (
      <AttractionCard
        item={item}
        onPress={openDetails}
        onToggleFavorite={toggleFavorite}
        favorite={!!favorites[item.id]}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.appTitle}>EcoTravel</Text>
        <Text style={styles.subtitle}>Atrações de turismo sustentável no Brasil</Text>
        <Image source={require('./assets/placeholder.jpg')} style={styles.hero} resizeMode="cover" />
      </View>

      <View style={styles.controls}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Pesquisar por nome, região ou descrição curta"
          style={styles.search}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma atração encontrada.</Text>}
      />

      <Modal visible={!!selected} animationType="slide" onRequestClose={closeDetails}>
        {selected && (
          <SafeAreaView style={styles.modalContainer}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <Image source={selected.image} style={styles.modalImage} resizeMode="cover" />
              <Text style={styles.modalTitle}>{selected.name}</Text>
              <Text style={styles.modalRegion}>{selected.region}</Text>
              <Text style={styles.modalDescription}>{selected.description}</Text>

              <View style={styles.modalActions}>
                <Pressable onPress={() => toggleFavorite(selected.id)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>
                    {favorites[selected.id] ? 'Remover favorito' : 'Favoritar'}
                  </Text>
                </Pressable>
                <Pressable onPress={closeDetails} style={[styles.modalButton, styles.closeBtn]}>
                  <Text style={[styles.modalButtonText, styles.closeText]}>Fechar</Text>
                </Pressable>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f5f8' },
  header: { padding: 16, alignItems: 'center' },
  appTitle: { fontSize: 24, fontWeight: '800' },
  subtitle: { fontSize: 14, color: '#555', marginTop: 4 },
  hero: { width: '100%', height: 140, marginTop: 12, borderRadius: 10 },
  controls: { paddingHorizontal: 16, paddingTop: 6 },
  search: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  list: { padding: 16, paddingBottom: 32 },
  empty: { textAlign: 'center', marginTop: 30, color: '#777' },

  // modal
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalImage: { width: '100%', height: 220, borderRadius: 8, marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: '800' },
  modalRegion: { fontSize: 13, color: '#666', marginBottom: 8 },
  modalDescription: { fontSize: 15, marginTop: 8, lineHeight: 22 },
  modalActions: { flexDirection: 'row', marginTop: 16 },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1a73e8',
    marginRight: 10
  },
  modalButtonText: { color: '#1a73e8' },
  closeBtn: { borderColor: '#333' },
  closeText: { color: '#333' }
});
