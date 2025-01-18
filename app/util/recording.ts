import { Audio } from 'expo-av';

async function startRecording(requestPermission) {
  const permissionResponse = await requestPermission();
  if (permissionResponse.granted) {
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recording.startAsync();
    return { recording, permissionResponse };
  } else {
    throw new Error('Permission to access microphone is required!');
  }
}

async function stopRecording(recording) {
  await recording.stopAndUnloadAsync();
  return recording.getURI();
}

async function playRecording(uri) {
  const { sound } = await Audio.Sound.createAsync({ uri });
  await sound.playAsync();
}

export { startRecording, stopRecording, playRecording };
