import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, AlertTriangle } from 'lucide-react-native';

interface VideoPlayerProps {
  source: string;
}

export default function VideoPlayer({ source }: VideoPlayerProps) {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePlayPause = () => {
    if (video.current) {
      status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
    }
  };

  const toggleMute = () => {
    if (video.current) {
      status.isMuted ? video.current.setIsMutedAsync(false) : video.current.setIsMutedAsync(true);
    }
  };

  const toggleFullScreen = async () => {
    if (!video.current) return;

    if (isFullScreen) {
      await video.current.dismissFullscreenPlayer();
    } else {
      await video.current.presentFullscreenPlayer();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handlePlaybackStatusUpdate = (newStatus: any) => {
    setStatus(newStatus);
    if (newStatus.error) {
      setError(`Playback Error: ${newStatus.error}`);
    } else if (newStatus.didJustFinish) {
      setError(null); // Clear error if playback finishes successfully
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: source }}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onError={(e) => setError(`Video Error: ${e.message}`)}
      />

      {!status.isLoaded && !error && (
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

      {!error && status.isLoaded && (
        <View style={styles.controlsOverlay}>
          <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
            {status.isPlaying ? <Pause color="#fff" size={24} /> : <Play color="#fff" size={24} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
            {status.isMuted ? <VolumeX color="#fff" size={24} /> : <Volume2 color="#fff" size={24} />}
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