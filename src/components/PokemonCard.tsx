import { Pokemon, Types } from '@/app/page';
import React, { useState } from 'react';

interface PokemonCardProps {
    pokemon : Pokemon;
    shiny: boolean;
    types: Types[];
    language: boolean;
}


export default function PokemonCard({pokemon, types}: PokemonCardProps){
    const [shiny, setShiny] = useState(false);
    const pokemonTypes = pokemon.types
        .map(t => types.find(type => type.id === t))
        .filter(pt => pt !== undefined);

    return (
        <div className="border border-red-600 p-4 bg-blue-300 text-center">
            <p>#{pokemon.id}, {pokemon.name.en}, g:{pokemon.generation}</p>
            <label>
                <input type="checkbox" checked={shiny} onChange={(e) => setShiny(e.target.checked)}/>
            </label>
            <img 
            src={shiny ? pokemon.image_shiny : pokemon.image} 
            alt={pokemon.name.fr} 
            className="w-32 h-32 object-cover mx-auto mt-2 rounded"/>
            
            <p>{pokemonTypes.map(pt => (
                <span key={pt.id}>
                    <img src={pt?.image} alt={pt?.name.fr} width="12" />
                    {pt?.name.fr}
                </span>
            ))}</p>
        </div>
    )
}