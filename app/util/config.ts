import { setConfig } from './settings';

const saveConfigs = async (configs) => {
  for (const [key, value] of Object.entries(configs)) {
    await setConfig(key, value);
  }
};

export { saveConfigs };
