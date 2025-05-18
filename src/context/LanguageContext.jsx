import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("EN");

    useEffect(() => {
        document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}