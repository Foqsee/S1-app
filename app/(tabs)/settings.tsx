import { View, Text, Button, TextInput } from 'react-native';
import { getConfig, setConfig } from '../util/settings';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';



export default function Tab() {
  const [openaiApiKey, setOpenaiApiKey] = useState<string | undefined>();
  const [llmModel, setLlmModel] = useState<string | undefined>();

  async function saveConfigs() {
    console.log('Saving configs..');

    await setConfig('openaiApiKey', openaiApiKey);
    await setConfig('llmModel', llmModel);
  }

  useEffect(() => {
    getConfig('openaiApiKey').then((key) => {
      if (key) {
        setOpenaiApiKey(key);
      }
    });

    getConfig('llmModel').then((model) => {
      if (model) {
        setLlmModel(model);
      }
    });

  }, []);

  return (
    <View className="bg-primary p-4 mt-6">
      <View className="mb-4">
        <Text className="text-white">OpenAI API Key</Text>
        <Text className="text-gray-600 mb-2">Will be used to transcribe audio and answer questions</Text>

        <TextInput
          style={{ padding: 8, backgroundColor: '#191919', borderColor: '#474747', borderWidth: 1, borderRadius: 4, color: '#fff' }}
          selectionColor='white'
          placeholderTextColor='#333'
          cursorColor='white'
          value={openaiApiKey}
          onChange={(e) => setOpenaiApiKey(e.nativeEvent.text)}
          placeholder="API Key" />
      </View>

      <View className="mb-4">
        <Text className="text-white">LLM Model</Text>
        <Text className="text-gray-600 mb-2">Will be used to generate text</Text>

        <Picker
          selectedValue={llmModel}
          onValueChange={(itemValue, itemIndex) => setLlmModel(itemValue)}
          style={{ backgroundColor: '#191919', borderColor: '#474747', borderWidth: 1, borderRadius: 4, color: '#fff' }}
          dropdownIconColor={'#fff'}
        >
          <Picker.Item label="GPT-3.5 (cheaper)" value="gpt-3" />
          <Picker.Item label="GPT-4" value="gpt-4" />
        </Picker>

      </View>


      <Button onPress={saveConfigs} title='Save configs' />
    </View>
  );
}