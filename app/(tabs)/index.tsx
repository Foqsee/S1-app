import { useState } from 'react';
import { View, Button, Text, Image } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

import { getConfig } from '../util/settings';
import { oaTranscribeRecording } from '../util/openai';

export default function Tab() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [recordingUri, setRecordingUri] = useState<string | undefined>();
  const [transcription, setTranscription] = useState<string | undefined>();
  const [transcribing, setTranscribing] = useState<boolean>(false);


  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    setRecordingUri(uri);
    console.log('Recording stopped and stored at', uri);
  }

  async function playRecoding() {
    const { sound } = await Audio.Sound.createAsync({ uri: recordingUri, name: 'recording', type: 'audio/m4a' });
    await sound.playAsync();
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

      setTranscribing(false);

    } catch (err) {
      console.error('Failed to transcribe recording', err);
    }
  }
  //
  //

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Image source={require('../../assets/icon-transparent.png')} style={{ width: 200, height: 200 }} />

      <View className="flex">
        <View className="mb-4">
          <Button
            title={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? stopRecording : startRecording}
          />
        </View>
        <Button title='Transcribe recording' color='#1430B9' onPress={transcribeRecording} />
      </View>

      <View className="mb-4 bg-white p-4 rounded-md mt-6">
        {transcribing ? <Text className="font-semibold">Transcribing..</Text> :
          <>
            <Text className="font-semibold">Transcription:</Text>
            <Text className="italic">{transcription}</Text>
          </>
        }
      </View>

    </View>
  );
}