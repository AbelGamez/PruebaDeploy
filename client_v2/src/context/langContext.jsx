import React,{useState} from 'react'
import MensajesIngles from "../lang/en-US.json";
import MensajesES from "../lang/es-ES.json";
import { IntlProvider } from 'react-intl';
const langContext=React.createContext();

const LangProvider= ({children}) => {

    let localePorDefecto;
    let mensajesPorDefecto;
    const lang=localStorage.getItem('lang')

    if (lang) {
        
        localePorDefecto=lang

        if (lang==='es-ES') {
            mensajesPorDefecto = MensajesES;
        }else if(lang==='en-US'){
            mensajesPorDefecto=MensajesIngles
        }
    }else{
        localePorDefecto = 'en-US'
        mensajesPorDefecto=MensajesIngles
    }

    const [mensajes,establecerMensajes]=useState(mensajesPorDefecto);
    const [locale,establecerLocale]=useState(localePorDefecto);

    const establecerLenguaje = (lenguaje)=>{
        switch(lenguaje){
            case 'es-ES':
                establecerMensajes(MensajesES);
                establecerLocale('es-ES')
                localStorage.setItem('lang','es-ES')
                break;
            case 'en-US':
                establecerMensajes(MensajesIngles);
                establecerLocale('en-US')
                localStorage.setItem('lang','en-US')
                break;
            default:
                establecerMensajes(MensajesIngles);
                establecerLocale('en-US')
                localStorage.setItem('lang','en-US')
        }
    }

    return (
        <langContext.Provider value={{establecerLenguaje: establecerLenguaje}}>
           <IntlProvider locale={locale} messages={mensajes}>
                {children}
            </IntlProvider>
        </langContext.Provider>

    );
}

export {LangProvider,langContext};