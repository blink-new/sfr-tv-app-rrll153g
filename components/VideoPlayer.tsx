import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, AlertTriangle } from 'lucide-react-native';

interface VideoPlayerProps {
  source: string;
}

export default function VideoPlayer({ source }: VideoPlayerProps) {
  const transformedSource = useMemo(() => {
    if (Platform.OS === 'web') {
      // Mixed-content fix: browsers block http streams when site is https. Use corsproxy.io to upgrade.
      if (source.startsWith('http://')) {
        return `https://corsproxy.io/${source}`;
      }
    }
    return source;
  }, [source]);

  const player = useVideoPlayer(transformedSource);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (player) {
      // On web, most browsers block autoplay with sound. Start muted to comply with autoplay policies.
      if (Platform.OS === 'web') {
        player.muted = true;
      }
      player.play();
      player.loop = true;
      if (Platform.OS !== 'web') {
        player.muted = false;
      }
      player.volume = 1.0;

      const subscription = player.addListener((event) => {
        if (event.state === 'error') {
          setError(`Playback Error: ${event.error}`);
        } else if (event.state === 'ready') {
          setError(null);
        }
      });

      return () => {
        subscription.remove();
        player.pause();
      };
    }
  }, [player, source]);

  const togglePlayPause = () => {
    if (player) {
      player.paused ? player.play() : player.pause();
    }
  };

  const toggleMute = () => {
    if (player) {
      player.muted = !player.muted;
    }
  };

  const toggleFullScreen = () => {
    // Fullscreen functionality for VideoView is typically handled by the component itself
    // or requires native module integration. For now, we'll just toggle a state.
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="contain"
        // Enable CORS fetching for remote HLS playlists when running on web
        crossOrigin={Platform.OS === 'web' ? 'anonymous' : undefined}
      />

      {!player?.isLoaded && !error && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ff6b35" />
          <Text style={styles.loadingText}>Loading stream...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorOverlay}>
          <AlertTriangle color="#ff4444" size={48} />
          <Text style={styles.errorText}>Error loading stream:</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorHint}>Please try another channel or check your internet connection.</Text>
        </View>
      )}

      {!error && player?.isLoaded && (
        <View style={styles.controlsOverlay}>
          <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
            {player?.paused ? <Play color="#fff" size={24} /> : <Pause color="#fff" size={24} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
            {player?.muted ? <VolumeX color="#fff" size={24} /> : <Volume2 color="#fff" size={24} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFullScreen} style={styles.controlButton}>
            {isFullScreen ? <Minimize color="#fff" size={24} /> : <Maximize color="#fff" size={24} />}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
  },
  errorText: {
    color: '#ff4444',
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorHint: {
    color: '#ccc',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    paddingVertical: 5,
  },
  controlButton: {
    padding: 10,
  },
});