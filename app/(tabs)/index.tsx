import { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

import { getConfig } from '../util/settings';
import { oaTranscribeRecording } from '../util/openai';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { startRecording, stopRecording, playRecording } from '../util/audio';

export default function Tab() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recordingUri, setRecordingUri] = useState<string | undefined>();
  const [transcription, setTranscription] = useState<string | undefined>();
  const [transcribing, setTranscribing] = useState<boolean>(false);
  const { theme } = useTheme();

  async function handleStartRecording() {
    const { recording, permissionResponse } = await startRecording(requestPermission);
    setRecording(recording);
    if (permissionResponse) {
      setPermissionResponse(permissionResponse);
    }
  }

  async function handleStopRecording() {
    const uri = await stopRecording(recording);
    setRecording(undefined);
    setRecordingUri(uri);
  }

  async function handlePlayRecording() {
    await playRecording(recordingUri);
  }

  async function transcribeRecording() {
    const openaiApiKey = await getConfig('openaiApiKey');
    try {
      setTranscribing(true);
      const fileData = await fetch(recordingUri);
      const blob = await fileData.blob();
      const file = new File([blob], 'recording', { type: 'audio/m4a', lastModified: Date.now() });

      const response = oaTranscribeRecording(file);

      const tempTranscription = (await response).text;
      console.log('Transcription:', tempTranscription);

      setTranscription(tempTranscription);

      setTranscribing(false);

    } catch (err) {
      console.error('Failed to transcribe recording', err);
    }
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
    },
    image: {
      width: 50,
      height: 50,
    },
    flexContainer: {
      flex: 1,
    },
    marginBottom: {
      marginBottom: 4,
    },
    buttonColor: {
      color: theme === 'dark' ? '#0ea5e9' : '#000',
    },
    buttonColorFixed: {
      color: '#1430B9',
    },
    transcriptionContainer: {
      marginBottom: 4,
      padding: 4,
      borderRadius: 4,
      marginTop: 6,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
    },
    fontBold: {
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    fontItalic: {
      fontStyle: 'italic',
      color: theme === 'dark' ? '#fff' : '#000',
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon-transparent.png')} style={styles.image} />

      <View style={styles.flexContainer}>
        <View style={styles.marginBottom}>
          <Button
            title={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? handleStopRecording : handleStartRecording}
            color={styles.buttonColor.color}
          />
        </View>
        <Button title='Transcribe recording' color={styles.buttonColorFixed.color} onPress={transcribeRecording} />
      </View>

      <View style={styles.transcriptionContainer}>
        {transcribing ? <Text style={styles.fontBold}>Transcribing..</Text> :
          <>
            <Text style={styles.fontBold}>Transcription:</Text>
            <Text style={styles.fontItalic}>{transcription}</Text>
          </>
        }
      </View>

    </View>
  );
}
