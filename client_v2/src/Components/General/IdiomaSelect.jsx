import React, { useContext, useState } from "react";
import { langContext } from "../../context/langContext";

const IdiomaSelect = () => {
  const { establecerLenguaje } = useContext(langContext) || {};
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLanguageChange = (langCode) => {
    establecerLenguaje(langCode);
    localStorage.setItem("lang", langCode);
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          Elegir idioma
        </button>
      </div>

      {menuAbierto && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => {
                handleLanguageChange("es-ES");
                setMenuAbierto(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              🇪🇸&emsp;ESP
            </button>
            <button
              onClick={() => {
                handleLanguageChange("en-US");
                setMenuAbierto(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              🇺🇲&emsp;US
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdiomaSelect;
