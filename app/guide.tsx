import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft, Star, Radio } from 'lucide-react-native';
import { router } from 'expo-router';

const channels = [
  {
    id: 1,
    name: 'TF1',
    number: '1',
    logo: 'https://i.imgur.com/O8iK3Sj.png',
    currentShow: 'Journal de 20h',
    category: 'news',
    isLive: true,
    isFavorite: false,
    streamUrl: 'http://goldtvhd.tv:8080/group-sky.ddns.net/sH6JbvQ67rxgfddfvvdfc/2650',
    schedule: [
      { time: '20:00', title: 'Journal de 20h', duration: '30 min' },
      { time: '20:30', title: 'Météo', duration: '5 min' },
      { time: '20:35', title: 'Demain nous appartient', duration: '45 min' },
      { time: '21:20', title: 'Film: Le Dîner de Cons', duration: '1h30' },
    ]
  },
  {
    id: 2,
    name: 'France 2',
    number: '2',
    logo: 'https://i.imgur.com/O8iK3Sj.png',
    currentShow: 'Plus belle la vie',
    category: 'series',
    isLive: true,
    isFavorite: true,
    streamUrl: 'http://goldtvhd.tv:8080/group-sky.ddns.net/sH6JbvQ67rxgfddfvvdfc/2941',
    schedule: [
      { time: '19:55', title: 'Un si grand soleil', duration: '25 min' },
      { time: '20:20', title: 'Météo', duration: '5 min' },
      { time: '20:25', title: 'Journal de 20h', duration: '30 min' },
      { time: '21:00', title: 'Film: Intouchables', duration: '1h52' },
    ]
  },
  {
    id: 3,
    name: 'M6',
    number: '6',
    logo: 'https://i.imgur.com/O8iK3Sj.png',
    currentShow: 'Top Chef',
    category: 'movies',
    isLive: true,
    isFavorite: false,
    streamUrl: 'http://goldtvhd.tv:8080/group-sky.ddns.net/sH6JbvQ67rxgfddfvvdfc/1651',
    schedule: [
      { time: '19:45', title: 'Le 19:45', duration: '20 min' },
      { time: '20:05', title: 'Scènes de ménages', duration: '25 min' },
      { time: '20:30', title: 'Top Chef', duration: '1h30' },
      { time: '22:00', title: 'Cauchemar en cuisine', duration: '1h15' },
    ]
  },
  {
    id: 4,
    name: 'Canal+',
    number: '4',
    logo: 'https://i.imgur.com/O8iK3Sj.png',
    currentShow: 'Film: Inception',
    category: 'movies',
    isLive: true,
    isFavorite: true,
    streamUrl: 'http://goldtvhd.tv:8080/group-sky.ddns.net/sH6JbvQ67rxgfddfvvdfc/82',
    schedule: [
      { time: '20:00', title: 'Le Grand Journal', duration: '45 min' },
      { time: '20:45', title: 'Film: Inception', duration: '2h28' },
      { time: '23:15', title: 'Late Show', duration: '1h' },
    ]
  },
  {
    id: 7,
    name: '2M',
    number: '50',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/a/a3/Logo_2M.svg/1200px-Logo_2M.svg.png',
    currentShow: 'Sabahiyat 2M',
    category: 'news',
    isLive: true,
    isFavorite: false,
    streamUrl: 'https://cdn-live.forja.ma/2m/2m.m3u8',
    schedule: [
      { time: '09:00', title: 'Sabahiyat 2M', duration: '2h' },
      { time: '11:00', title: 'Info Soir', duration: '30 min' },
      { time: '11:30', title: 'Ma Tensewnach', duration: '1h' },
      { time: '12:30', title: 'Allo 2M', duration: '1h' },
    ]
  },
  {
    id: 8,
    name: 'Al Aoula',
    number: '51',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Al_Aoula_logo.svg/1200px-Al_Aoula_logo.svg.png',
    currentShow: 'Journal Al Oula',
    category: 'news',
    isLive: true,
    isFavorite: false,
    streamUrl: 'https://cdn-live.forja.ma/alaoula/alaoula.m3u8',
    schedule: [
      { time: '12:00', title: 'Journal Al Oula', duration: '30 min' },
      { time: '12:30', title: 'Amouddou', duration: '1h' },
      { time: '13:30', title: 'Al Mousalsal', duration: '1h' },
      { time: '14:30', title: 'Film Marocain', duration: '1h30' },
    ]
  },
  {
    id: 9,
    name: 'Arryadia',
    number: '52',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Arryadia_logo.svg/2560px-Arryadia_logo.svg.png',
    currentShow: 'Botola Pro',
    category: 'sports',
    isLive: true,
    isFavorite: false,
    streamUrl: 'https://cdn-live.forja.ma/arryadia/arryadia.m3u8',
    schedule: [
      { time: '15:00', title: 'Botola Pro', duration: '2h' },
      { time: '17:00', title: 'Studio Botola', duration: '1h' },
      { time: '18:00', title: 'Al Mousalsal', duration: '1h' },
      { time: '19:00', title: 'Journal Arryadia', duration: '30 min' },
    ]
  },
];

export default function Guide() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);

  const handleChannelSelect = (channel: typeof channels[0]) => {
    setSelectedChannel(channel);
    router.setParams({ streamUrl: channel.streamUrl, channelLogo: channel.logo });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#fff" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GUIDE TV</Text>
        <View style={styles.headerRight}>
          <Star color="#ff6b35" size={24} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.channelListContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {channels.map((channel) => (
              <TouchableOpacity
                key={channel.id}
                style={[
                  styles.channelListItem,
                  selectedChannel.id === channel.id && styles.channelListItemActive,
                ]}
                onPress={() => handleChannelSelect(channel)}
              >
                <Image source={{ uri: channel.logo }} style={styles.channelListLogo} />
                <View style={styles.channelListInfo}>
                  <Text style={styles.channelListName}>{channel.name}</Text>
                  <Text style={styles.channelListNumber}>N°{channel.number}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.scheduleContainer}>
          <View style={styles.currentChannelInfo}>
            <Image source={{ uri: selectedChannel.logo }} style={styles.currentChannelLogo} />
            <View>
              <Text style={styles.currentChannelName}>{selectedChannel.name}</Text>
              <Text style={styles.currentChannelNumber}>Chaîne N°{selectedChannel.number}</Text>
            </View>
            {selectedChannel.isLive && (
              <View style={styles.liveIndicator}>
                <Radio color="#ff4444" size={12} fill="#ff4444" />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedChannel.schedule.map((program, index) => (
              <View key={index} style={styles.programItem}>
                <Text style={styles.programTime}>{program.time}</Text>
                <View style={styles.programDetails}>
                  <Text style={styles.programTitle}>{program.title}</Text>
                  <Text style={styles.programDuration}>{program.duration}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    padding: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  channelListContainer: {
    width: '30%',
    backgroundColor: '#1a1a1a',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  channelListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  channelListItemActive: {
    backgroundColor: '#ff6b35',
  },
  channelListLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  channelListInfo: {
    flex: 1,
  },
  channelListName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  channelListNumber: {
    color: '#ccc',
    fontSize: 12,
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 20,
  },
  currentChannelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  currentChannelLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  currentChannelName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  currentChannelNumber: {
    color: '#ccc',
    fontSize: 14,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  liveText: {
    color: '#ff4444',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  programItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  programTime: {
    color: '#ff6b35',
    fontSize: 16,
    fontWeight: 'bold',
    width: 60,
  },
  programDetails: {
    flex: 1,
    marginLeft: 15,
  },
  programTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  programDuration: {
    color: '#ccc',
    fontSize: 14,
  },
});