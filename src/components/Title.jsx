import { useContext } from "react";
import Search from "./Search";
import { LanguageContext } from "../context/LanguageContext";

export default function Title(){
    const {language} = useContext(LanguageContext);
    return(
        <>
            <div className="bg-light2 mt-4 mx-4">
                {language === 'en' && <h1 className="p-5">Welcome to our movie app</h1>}
                {language === 'ar' && <h1 className="p-5">مرحبًا بك في تطبيق الأفلام الخاص بنا</h1>}
                {language === 'fr' && <h1 className="p-5">Bienvenue dans notre application de cinéma</h1>}
                {language === 'zh' && <h1 className="p-5">欢迎来电影应用程序</h1>}

                {language === 'en' && <p className="mx-5 mb-5">Millions of movies, TV shows and people to discover. Explore now.</p>}
                {language === 'ar' && <p className="mx-5 mb-5">

ملايين من الأفلام، والمسلسلات التلفزيونية، والأشخاص لاكتشافهم. استكشف الآن.</p>}
                {language === 'fr' && <p className="mx-5 mb-5">Des millions de films, d’émissions télé et de personnes à découvrir. Explorez maintenant.</p>}
                {language === 'zh' && <p className="mx-5 mb-5">数百万部电影、电视剧和人物等你发现。立即探索</p>}

                <Search searchValue='' />
            </div>
        </>
    )
}