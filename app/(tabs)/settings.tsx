import { View, Text, Button, Switch, StyleSheet } from 'react-native';
import { getConfig, setConfig } from '../util/settings';
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Input from '../../components/Input';
import Picker from '../../components/Picker';
import { saveConfigs } from '../util/config';

export default function Tab() {
  const [openaiApiKey, setOpenaiApiKey] = useState<string | undefined>();
  const [llmModel, setLlmModel] = useState<string | undefined>();
  const { theme, toggleTheme } = useTheme();

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
      padding: 4,
      marginTop: 6,
    },
    marginBottom: {
      marginBottom: 4,
    },
    textBlackWhite: {
      color: theme === 'dark' ? '#fff' : '#000',
    },
    textGray: {
      color: theme === 'dark' ? '#999' : '#666',
      marginBottom: 2,
    },
    input: {
      padding: 2,
      backgroundColor: theme === 'dark' ? '#333' : '#ccc',
      borderColor: theme === 'dark' ? '#444' : '#ddd',
      borderWidth: 1,
      borderRadius: 4,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    picker: {
      backgroundColor: theme === 'dark' ? '#333' : '#ccc',
      borderColor: theme === 'dark' ? '#444' : '#ddd',
      borderWidth: 1,
      borderRadius: 4,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    buttonColor: {
      color: theme === 'dark' ? '#0ea5e9' : '#000',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.marginBottom}>
        <Text style={styles.textBlackWhite}>OpenAI API Key</Text>
        <Text style={styles.textGray}>Will be used to transcribe audio and answer questions</Text>

        <Input
          style={styles.input}
          selectionColor={theme === 'dark' ? '#fff' : '#000'}
          placeholderTextColor={theme === 'dark' ? '#333' : '#999'}
          cursorColor={theme === 'dark' ? '#fff' : '#000'}
          value={openaiApiKey}
          onChange={(e) => setOpenaiApiKey(e.nativeEvent.text)}
          placeholder="API Key" />
      </View>

      <View style={styles.marginBottom}>
        <Text style={styles.textBlackWhite}>LLM Model</Text>
        <Text style={styles.textGray}>Will be used to generate text</Text>

        <Picker
          selectedValue={llmModel}
          onValueChange={(itemValue, itemIndex) => setLlmModel(itemValue)}
          style={styles.picker}
          dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
        >
          <Picker.Item label="GPT-3.5 (cheaper)" value="gpt-3" />
          <Picker.Item label="GPT-4" value="gpt-4" />
        </Picker>

      </View>

      <View style={styles.marginBottom}>
        <Text style={styles.textBlackWhite}>Theme</Text>
        <Text style={styles.textGray}>Toggle between dark and light theme</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
        />
      </View>

      <Button onPress={saveConfigs} title='Save configs' color={styles.buttonColor.color} />
    </View>
  );
}
