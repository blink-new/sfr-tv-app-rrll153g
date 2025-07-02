import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import VideoPlayer from '@/components/VideoPlayer';
import { channels } from '@/data/channels';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function LiveTV() {
  const [currentChannel, setCurrentChannel] = useState(channels[0]);

  const renderChannelItem = ({ item }: { item: typeof channels[0] }) => (
    <TouchableOpacity
      style={styles.channelItem}
      onPress={() => setCurrentChannel(item)}
    >
      <Text style={styles.channelName}>{item.name}</Text>
      <Text style={styles.channelCountry}>{item.country}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#fff" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live TV</Text>
      </View>
      <View style={styles.playerContainer}>
        <VideoPlayer source={currentChannel.url} />
      </View>
      <View style={styles.channelListContainer}>
        <FlatList
          data={channels}
          renderItem={renderChannelItem}
          keyExtractor={(item) => item.url}
        />
      </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerContainer: {
    height: 250,
    backgroundColor: '#000',
  },
  channelListContainer: {
    flex: 1,
  },
  channelItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  channelName: {
    color: '#fff',
    fontSize: 16,
  },
  channelCountry: {
    color: '#999',
    fontSize: 14,
  },
});
