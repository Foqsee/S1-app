import * as SecureStore from 'expo-secure-store';

const getConfig = async (key) => {
    let result = await SecureStore.getItemAsync(key);

    if (result) {
        return result;
    }
}

const setConfig = async (key, value) => {
    if (!value) {
        return;
    }

    await SecureStore.setItemAsync(key, value);
}

export { getConfig, setConfig };
