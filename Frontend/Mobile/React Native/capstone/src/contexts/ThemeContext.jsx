import React, { createContext, useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';

const ThemeContextImpl = {
    theme: 'light',
    toggleTheme: () => {}
}

const ThemeContext = createContext(ThemeContextImpl);

const ThemeProvider = ({ children }) => {
    
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme => theme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider }