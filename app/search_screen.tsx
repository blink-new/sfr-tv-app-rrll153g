import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Search as SearchIcon, Clock, TrendingUp, Filter, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const trendingSearches = [
  'Game of Thrones',
  'Breaking Bad',
  'Netflix Originals',
  'Marvel',
  'Football',
  'Documentaires',
  'Comedies',
  'Action'
];

const recentSearches = [
  'Stranger Things',
  'The Office',
  'Friends',
  'Narcos'
];

const searchResults = [
  {
    id: 1,
    title: 'Breaking Bad',
    type: 'Série',
    year: '2008-2013',
    rating: '9.5',
    image: 'https://images.unsplash.com/photo-1489599735871-bf5b08a8b7c9?w=150&h=200&fit=crop',
    description: 'Un professeur de chimie se lance dans la fabrication de méthamphétamine.',
  },
  {
    id: 2,
    title: 'Better Call Saul',
    type: 'Série',
    year: '2015-2022',
    rating: '8.8',
    image: 'https://images.unsplash.com/photo-1512576431297-93b29bb04e82?w=150&h=200&fit=crop',
    description: 'Les aventures de l\'avocat Saul Goodman avant Breaking Bad.',
  },
  {
    id: 3,
    title: 'El Camino',
    type: 'Film',
    year: '2019',
    rating: '7.3',
    image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=150&h=200&fit=crop',
    description: 'Jesse Pinkman tente de s\'échapper après les événements de Breaking Bad.',
  },
];

const categories = [
  { id: 'all', name: 'Tout', active: true },
  { id: 'series', name: 'Séries', active: false },
  { id: 'movies', name: 'Films', active: false },
  { id: 'live', name: 'Direct', active: false },
  { id: 'sports', name: 'Sports', active: false },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(new Set(['all']));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  };

  const toggleCategory = (categoryId: string) => {
    const newSelection = new Set(selectedCategories);
    if (categoryId === 'all') {
      setSelectedCategories(new Set(['all']));
    } else {
      newSelection.delete('all');
      if (newSelection.has(categoryId)) {
        newSelection.delete(categoryId);
      } else {
        newSelection.add(categoryId);
      }
      if (newSelection.size === 0) {
        newSelection.add('all');
      }
      setSelectedCategories(newSelection);
    }
  };

  const renderSearchResult = (item: typeof searchResults[0]) => (
    <TouchableOpacity key={item.id} style={styles.resultItem}>
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <View style={styles.resultMeta}>
          <Text style={styles.resultType}>{item.type}</Text>
          <Text style={styles.resultYear}>{item.year}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {item.rating}</Text>
          </View>
        </View>
        <Text style={styles.resultDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderTrendingItem = (item: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.trendingItem}
      onPress={() => handleSearch(item)}
    >
      <TrendingUp color="#ff6b35" size={16} />
      <Text style={styles.trendingText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderRecentItem = (item: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.recentItem}
      onPress={() => handleSearch(item)}
    >
      <Clock color="#666" size={16} />
      <Text style={styles.recentText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#fff" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Recherche</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchIcon color="#666" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher films, séries, chaînes..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#666" size={20} />
        </TouchableOpacity>
      </View>

      {/* Categories Filter */}
      {isSearching && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategories.has(category.id) && styles.categoryChipActive
              ]}
              onPress={() => toggleCategory(category.id)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategories.has(category.id) && styles.categoryChipTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!isSearching ? (
          <>
            {/* Trending Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tendances</Text>
              <View style={styles.trendingGrid}>
                {trendingSearches.map(renderTrendingItem)}
              </View>
            </View>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recherches récentes</Text>
                {recentSearches.map(renderRecentItem)}
              </View>
            )}
          </>
        ) : (
          /* Search Results */
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Résultats pour "{searchQuery}" ({searchResults.length})
            </Text>
            {searchResults.map(renderSearchResult)}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    paddingRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  filterButton: {
    padding: 8,
  },
  categoriesContainer: {
    maxHeight: 50,
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryChipActive: {
    backgroundColor: '#ff6b35',
  },
  categoryChipText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 6,
  },
  trendingText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  recentText: {
    color: '#ccc',
    fontSize: 16,
    marginLeft: 12,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  resultImage: {
    width: 100,
    height: 150,
  },
  resultInfo: {
    flex: 1,
    padding: 16,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultType: {
    color: '#ff6b35',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  resultYear: {
    color: '#666',
    fontSize: 14,
    marginRight: 12,
  },
  ratingContainer: {
    backgroundColor: '#333',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
},
  rating: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultDescription: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});