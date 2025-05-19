export default function MoviesDurationLanguage({language, runtime, spoken_languages}){
    return(
        <>
            <div className="d-block mt-3">
                    {language === 'en' && 
                        <>                        
                            <p className='d-inline inter-600'>Duration:</p>
                            <span className='ms-3 inter-400 me-5'>{runtime} Min.</span>
                            <span className='d-inline inter-600 me-3'> Languages:</span>
                        </>

                    }
                    {language === 'ar' && 
                        <>                        
                            <p className='d-inline inter-600'>المدة:</p>
                            <span className='ms-3 inter-400 me-5'>{runtime} دقيقة</span>
                            <span className='d-inline inter-600 me-3'> اللغات:</span>
                        </>

                    }
                    {language === 'fr' && 
                        <>                        
                            <p className='d-inline inter-600'>Durée: </p>
                            <span className='ms-3 inter-400 me-5'>{runtime} Min.</span>
                            <span className='d-inline inter-600 me-3'> Langues: </span>
                        </>

                    }
                    {language === 'zh' && 
                        <>                        
                            <p className='d-inline inter-600'>时长：</p>
                            <span className='ms-3 inter-400 me-5'>{runtime} 分钟</span>
                            <span className='d-inline inter-600 me-3'> 语言：</span>
                        </>

                    }
                    {
                        spoken_languages?.map((language) =>(
                            <span className='me-3 ' key={language}>
                                {language.name}
                            </span>
                        ))
                    }
                    </div>
        </>
    )
}