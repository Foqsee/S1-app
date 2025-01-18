import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await SecureStore.getItemAsync('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme(colorScheme);
      }
    };
    loadTheme();
  }, [colorScheme]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    await SecureStore.setItemAsync('theme', newTheme);
  };

  const getThemeClasses = () => {
    return {
      backgroundColor: theme === 'dark' ? 'bg-black' : 'bg-white',
      textColor: theme === 'dark' ? 'text-white' : 'text-black',
      borderColor: theme === 'dark' ? 'border-gray-700' : 'border-gray-300',
      placeholderTextColor: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    };
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getThemeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
