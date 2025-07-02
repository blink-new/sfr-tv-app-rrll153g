import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Info } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const liveChannels = [
  {
    id: 1,
    name: 'TF1',
    number: '1',
    currentShow: 'Journal de 20h',
    image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&h=450&fit=crop',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=40&fit=crop',
    description: 'Actualités et informations du jour',
    isLive: true,
  },
  {
    id: 2,
    name: 'France 2',
    number: '2',
    currentShow: 'Plus belle la vie',
    image: 'https://images.unsplash.com/photo-1512576431297-93b29bb04e82?w=800&h=450&fit=crop',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=40&fit=crop',
    description: 'Série dramatique française',
    isLive: true,
  },
  {
    id: 3,
    name: 'Canal+',
    number: '4',
    currentShow: 'Film: Inception',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=40&fit=crop',
    description: 'Thriller de science-fiction',
    isLive: true,
  },
  {
    id: 4,
    name: 'M6',
    number: '6',
    currentShow: 'Top Chef',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=40&fit=crop',
    description: 'Concours culinaire',
    isLive: true,
  },
];

interface InteractiveTVViewerProps {
  onChannelChange?: (channel: typeof liveChannels[0]) => void;
}

export default function InteractiveTVViewer({ onChannelChange }: InteractiveTVViewerProps) {
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const currentChannel = liveChannels[currentChannelIndex];

  useEffect(() => {
    onChannelChange?.(currentChannel);
  }, [currentChannelIndex, onChannelChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  const changeChannel = (direction: 'next' | 'prev') => {
    setShowControls(true);
    if (direction === 'next') {
      setCurrentChannelIndex((prev) => (prev + 1) % liveChannels.length);
    } else {
      setCurrentChannelIndex((prev) => (prev - 1 + liveChannels.length) % liveChannels.length);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setShowControls(true);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
    setShowControls(true);
  };

  const handleScreenTouch = () => {
    setShowControls(true);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handleScreenTouch}
    >
      {/* Main TV Screen */}
      <Image
        source={{ uri: currentChannel.image }}
        style={styles.tvScreen}
        resizeMode="cover"
      />

      {/* Live Indicator */}
      <View style={styles.liveIndicator}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>DIRECT</Text>
      </View>

      {/* Channel Number */}
      <View style={styles.channelNumber}>
        <Text style={styles.channelNumberText}>{currentChannel.number}</Text>
      </View>

      {/* Channel Logo */}
      <View style={styles.channelLogo}>
        <Image
          source={{ uri: currentChannel.logo }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Controls Overlay */}
      {showControls && (
        <>
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.6)']}
            style={styles.controlsOverlay}
          >
            {/* Top Controls */}
            <View style={styles.topControls}>
              <TouchableOpacity style={styles.controlButton} onPress={toggleInfo}>
                <Info color="#fff" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={toggleMute}>
                {isMuted ? (
                  <VolumeX color="#fff" size={24} />
                ) : (
                  <Volume2 color="#fff" size={24} />
                )}
              </TouchableOpacity>
            </View>

            {/* Channel Navigation */}
            <View style={styles.channelNavigation}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => changeChannel('prev')}
              >
                <ChevronLeft color="#fff" size={32} />
              </TouchableOpacity>

              <View style={styles.channelInfo}>
                <Text style={styles.channelName}>{currentChannel.name}</Text>
                <Text style={styles.currentShow}>{currentChannel.currentShow}</Text>
              </View>

              <TouchableOpacity
                style={styles.navButton}
                onPress={() => changeChannel('next')}
              >
                <ChevronRight color="#fff" size={32} />
              </TouchableOpacity>
            </View>

            {/* Bottom Channel Bar */}
            <View style={styles.bottomControls}>
              <View style={styles.channelBar}>
                {liveChannels.map((channel, index) => (
                  <TouchableOpacity
                    key={channel.id}
                    style={[
                      styles.channelBarItem,
                      index === currentChannelIndex && styles.channelBarItemActive
                    ]}
                    onPress={() => {
                      setCurrentChannelIndex(index);
                      setShowControls(true);
                    }}
                  >
                    <Text style={[
                      styles.channelBarNumber,
                      index === currentChannelIndex && styles.channelBarNumberActive
                    ]}>
                      {channel.number}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </LinearGradient>
        </>
      )}

      {/* Program Info Panel */}
      {showInfo && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoProgramTitle}>{currentChannel.currentShow}</Text>
          <Text style={styles.infoProgramDescription}>{currentChannel.description}</Text>
          <Text style={styles.infoProgramTime}>20:00 - 21:00</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  tvScreen: {
    width: '100%',
    height: '100%',
  },
  liveIndicator: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginRight: 4,
  },
  liveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  channelNumber: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  channelNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  channelLogo: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  logoImage: {
    width: 40,
    height: 20,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    paddingTop: 50,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  channelNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 25,
  },
  channelInfo: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  channelName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentShow: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 2,
  },
  bottomControls: {
    padding: 16,
  },
  channelBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 8,
  },
  channelBarItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 2,
  },
  channelBarItemActive: {
    backgroundColor: '#ff6b35',
  },
  channelBarNumber: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
  },
  channelBarNumberActive: {
    color: '#fff',
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 16,
  },
  infoProgramTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoProgramDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  infoProgramTime: {
    color: '#ff6b35',
    fontSize: 12,
    fontWeight: '600',
  },
});