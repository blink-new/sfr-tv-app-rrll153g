import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import { 
  Tv, 
  Film, 
  Radio, 
  Search, 
  Settings, 
  Repeat, 
  Save, 
  MonitorPlay, 
  Globe, 
  HelpCircle, 
  PlusCircle, 
  Heart
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const menuItems = [
  { id: 'replay', title: 'REPLAY', icon: Repeat },
  { id: 'enregistrements', title: 'ENREGISTREMENTS', icon: Save },
  { id: 'guide', title: 'GUIDE TV', icon: Tv },
  { id: 'radios', title: 'RADIOS', icon: Radio },
  { id: 'vod', title: 'MES VOD', icon: Film },
  { id: 'recherche', title: 'RECHERCHE', icon: Search },
  { id: 'enrichir', title: 'ENRICHIR MON OFFRE', icon: PlusCircle },
  { id: 'mediacenter', title: 'MEDIA CENTER', icon: MonitorPlay },
  { id: 'navigateur', title: 'NAVIGATEUR', icon: Globe },
  { id: 'astuces', title: 'ASTUCES', icon: HelpCircle },
  { id: 'diagnostics', title: 'DIAGNOSTICS', icon: Heart },
  { id: 'reglages', title: 'RÉGLAGES', icon: Settings, active: true },
];

const featuredContent = [
  {
    id: 1,
    title: 'EN DIRECT ET EN EXCLUSIVITE',
    image: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=800&h=450&fit=crop',
    logo: 'https://i.imgur.com/1Y2Y5c1.png'
  },
  {
    id: 2,
    title: 'Inédit TV',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&h=450&fit=crop',
    logo: 'https://i.imgur.com/sX3a2yL.png'
  },
];

export default function Home() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
      // @ts-ignore
      const formattedTime = now.toLocaleDateString('fr-FR', options).toUpperCase();
      setCurrentTime(formattedTime.replace('À', ''));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderMenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity style={[styles.menuItem, item.active && styles.menuItemActive]}>
      <item.icon color={item.active ? '#fff' : '#000'} size={32} />
      <Text style={[styles.menuItemText, item.active && styles.menuItemTextActive]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=1200&h=800&fit=crop' }} 
      style={styles.container}
    >
      <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: 'https://i.imgur.com/O8iK3Sj.png' }} style={styles.logo} />
          <Text style={styles.logoText}>Service by <Text style={{fontWeight: 'bold'}}>numericable</Text></Text>
        </View>
        <Text style={styles.dateTime}>{currentTime}</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.playerContainer}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: 'http://goldtvhd.tv:8080/group-sky.ddns.net/sH6JbvQ67rxgfddfvvdfc/2650',
            }}
            useNativeControls={false}
            resizeMode="cover"
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <View style={styles.videoOverlay}>
            <Image source={{ uri: 'https://i.imgur.com/O8iK3Sj.png' }} style={styles.channelLogo} />
            <View style={styles.videoTextContainer}>
                <Text style={styles.videoTextTitle}>BIENTÔT</Text>
                <Text style={styles.videoTextSubtitle}>LE MEILLEUR DU SPORT AVEC LA QUALITÉ 4K</Text>
            </View>
            <View style={styles.definitionBadge}>
                <Text style={styles.definitionText}>EN HAUTE DÉFINITION</Text>
            </View>
          </View>
        </View>
        <View style={styles.featuredContainer}>
          {featuredContent.map(item => (
            <TouchableOpacity key={item.id} style={styles.featuredItem}>
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <View style={styles.featuredOverlay} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredTitle}>{item.title}</Text>
                {item.logo && <Image source={{ uri: item.logo }} style={styles.featuredLogo} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.menuContainer}>
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          numColumns={6}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.bottomBar} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingTop: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  dateTime: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    marginTop: 120,
    flex: 1,
  },
  playerContainer: {
    width: width * 0.4,
    height: height * 0.4,
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  channelLogo: {
      width: 50, 
      height: 50, 
      resizeMode: 'contain', 
      position: 'absolute', 
      top: -120, 
      left: 0
  },
  videoTextContainer: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 10,
      borderRadius: 5,
  },
  videoTextTitle: {
      color: '#fff',
      fontWeight: 'bold'
  },
  videoTextSubtitle: {
      color: '#fff',
      fontSize: 18
  },
  definitionBadge: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      alignSelf: 'flex-end',
      marginTop: 10
  },
  definitionText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 12
  },
  featuredContainer: {
    flex: 1,
    height: height * 0.4,
    justifyContent: 'space-between',
  },
  featuredItem: {
    width: '100%',
    height: '48%',
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  featuredTextContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    width: '60%'
  },
  featuredLogo: {
      width: 80,
      height: 40,
      resizeMode: 'contain'
  },
  menuContainer: {
    paddingHorizontal: 50,
    paddingBottom: 50,
  },
  menuItem: {
    width: (width - 100) / 6 - 10,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  menuItemActive: {
    backgroundColor: '#cc0000',
  },
  menuItemText: {
    color: '#000',
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  menuItemTextActive: {
    color: '#fff',
  },
  bottomBar: {
      height: 10,
      backgroundColor: '#cc0000',
      position: 'absolute',
      bottom: 20,
      left: 50,
      width: '30%',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
  }
});