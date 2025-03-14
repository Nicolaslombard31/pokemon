'use client'

import PokemonCard from "@/components/PokemonCard";
import { useEffect, useState } from "react";
import logo from './pokedex.png';
import logo1 from './fr.png';
import logo2 from './en.png'
import Image from "next/image";

export interface Pokemon {
  id: number;
  name: {
    fr: string;
    en: string;
  }
  generation: number;
  height: number;
  image: string;
  image_shiny: string;
  stats: number;
  types: number[];
}

export interface Types{
  id: number;
  name: {
    fr: string;
    en: string;
  };
  image: string;
}

export default function Home() {
  const [types, setTypes] = useState([]);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [language, setLanguage] = useState(false);
  const choiceLanguage = () =>{
    setLanguage(language === true ? false : true)
  }

  useEffect(() => {
    fetch('https://pokedex-api.3rgo.tech/api/types')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setTypes(data.data);
    })
    .catch(error => {
      console.error('Error:', error);
      setTypes([]);
    });
    fetch('https://pokedex-api.3rgo.tech/api/pokemon')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setPokemon(data.data);
    })
    .catch(error => {
      console.error('Error:', error);
      setTypes([]);
    });
  }, []);

  return (
    <div className="bg-yellow-300">
      <header className="w-full flex items-center justify-center">
        <div>
          <Image src={logo} alt="pokedex" className="ml-20"/>
          <input
            type="text"
            placeholder="Recherche..."
            className=" w-100 p-2 border border-gray-300 rounded-l-md ml-10"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            Rechercher
          </button>
          <button onClick={choiceLanguage}>
            <Image src={language ? logo2 : logo1} alt="francais" className="w-20"/>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-4 items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20">
        {pokemon.map(p => (
          <PokemonCard key={p.id} pokemon={p} types={types} shiny={true} language={language}/>
        ))}
      </div>
    </div>
  );
}
