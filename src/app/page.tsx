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
  weight: number;
  evolvesTo: Record<number, string>;
  evolvesFrom: Record<number, string>;
}

export interface Types {
  id: number;
  name: {
    fr: string;
    en: string;
  };
  image: string;
}

export default function Home() {
  const [types, setTypes] = useState<Types[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [language, setLanguage] = useState(false);
  const [sortOrder, setSortOrder] = useState<'name_asc' | 'name_desc' | 'n_asc' | 'n_desc' | 'weight_asc' | 'height_desc' | 'height_asc' | 'weight_desc' | 'none'>('none');
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);

  const choiceLanguage = () => {
    setLanguage(!language);
  }

  const uniqueGenerations = Array.from(
    new Set(pokemon.flatMap(p => p.generation))
  ).sort((a, b) => a - b);
  

  useEffect(() => {
    fetch('https://pokedex-api.3rgo.tech/api/types')
      .then(response => response.json())
      .then(data => setTypes(data.data))
      .catch(error => {
        console.error('Error:', error);
        setTypes([]);
      });

    fetch('https://pokedex-api.3rgo.tech/api/pokemon')
      .then(response => response.json())
      .then(data => setPokemon(data.data))
      .catch(error => {
        console.error('Error:', error);
        setPokemon([]);
      });
  }, []);
  console.log(pokemon);
  console.log(types);

  const triPokemons = (a: Pokemon, b: Pokemon) => {
    const nameA = language ? a.name.en : a.name.fr;
    const nameB = language ? b.name.en : b.name.fr;
    const idA = a.id;
    const idB = b.id;
    const weightA = a.weight;
    const weightB = b.weight;
    const heightA = a.height;
    const heightB = b.height;

    if (sortOrder === 'name_asc') return nameA.localeCompare(nameB);
    if (sortOrder === 'name_desc') return nameB.localeCompare(nameA);
    if (sortOrder === 'height_desc') return heightB - heightA;
    if (sortOrder === 'n_desc') return idB - idA;
    if (sortOrder === 'weight_asc') return weightA - weightB;
    if (sortOrder === 'weight_desc') return weightB - weightA;
    if (sortOrder === 'height_asc') return heightA - heightB;

    return idA - idB;
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'name_asc' | 'name_desc' | 'n_asc' | 'n_desc' | 'weight_asc' | 'height_desc' | 'height_asc' | 'weight_desc' | 'none');
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedType(value === "all" ? null : parseInt(value));
  };

  const handleGenerationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const generation = value === "all" ? null : parseInt(value);
    setSelectedGeneration(generation);
  };
  

  const filteredPokemon = pokemon
    .filter(p => selectedGeneration === null || p.generation === selectedGeneration)
    .filter(p => selectedType === null || p.types.includes(selectedType))
    .sort(triPokemons);

  return (
    <div className="bg-yellow-300">
      <Image src={logo} alt="pokedex" className="ml-130" priority />
      <header className="w-full flex items-center justify-center">
        <div className="bg-[#F9DF7D] rounded-2xl shadow-md p-4 m-4 flex flex-wrap items-center justify-center gap-4">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="mr-4 ml-4 p-2 border border-gray-300 rounded"
          >
            <option value="n_asc">{language ? '# ascending' : '# Croissant'}</option>
            <option value="n_desc">{language ? '# descending' : '# Décroissant'}</option>
            <option value="name_asc">{language ? 'Name ascending' : 'Nom Croissant'}</option>
            <option value="name_desc">{language ? 'Name descending' : 'Nom Décroissant'}</option>
            <option value="weight_asc">{language ? 'Weight ascending' : 'Poids Croissant'}</option>
            <option value="weight_desc">{language ? 'Weight descending' : 'Poids Décroissant'}</option>
            <option value="height_asc">{language ? 'Height ascending' : 'Taille Croissant'}</option>
            <option value="height_desc">{language ? 'Height descending' : 'Taille Décroissant'}</option>
          </select>

          <input
            type="text"
            placeholder={language ? 'Search...' : 'Rechercher...'}
            className="w-100 p-2 border border-gray-300 rounded-md mr-40 ml-50"
          />

          <select
            value={selectedType ?? "all"}
            onChange={handleTypeChange}
            className="mr-20 p-2 border border-gray-300 rounded"
          >
            <option value="all">{language ? " Type" : "Type"}</option>
            {types.map(type => (
              <option key={type.id} value={type.id}>
                {language ? type.name.en : type.name.fr}
              </option>
            ))}
          </select>

          <select
          value={selectedGeneration ?? "all"}
          onChange={handleGenerationChange}
          className="mr-20 p-2 border border-gray-300 rounded"
          >
            <option value="all">{language ? "Generation" : "Génération"}</option>
            {uniqueGenerations.map(gen => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>


          <button 
          onClick={choiceLanguage} 
          className="p-2 border border-gray-300 rounded h-[42px] flex items-center justify-center"
          >
            <Image 
              src={language ? logo2 : logo1} 
              alt="langue" 
              className="w-6 h-6" 
            />
          </button>

        </div>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-4 sm:p-8">
        {filteredPokemon.map(p => (
          <PokemonCard key={p.id} pokemon={p} types={types} shiny={true} language={language} />
        ))}
      </div>
    </div>
  );
}
