import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("en");

    useEffect(() => {
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}