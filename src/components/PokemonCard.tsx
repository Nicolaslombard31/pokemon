import { Pokemon, Types } from '@/app/page';
import { useState } from 'react';

interface PokemonCardProps {
    pokemon : Pokemon;
    shiny: boolean;
    types: Types[];
    language: boolean;
}


export default function PokemonCard({pokemon, types, language}: PokemonCardProps){
    const [shiny, setShiny] = useState(false);
    const pokemonTypes = pokemon.types
        .map(t => types.find(type => type.id === t))
        .filter(pt => pt !== undefined);
    
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);


    return (
        <div className="w-50 h-75 border border-4 border-cyan-600 p-4 bg-blue-300 text-center">
            <p>#{pokemon.id}, {language ? pokemon.name.en : pokemon.name.fr}, g:{pokemon.generation}</p>
            <img 
            src={pokemon.image} 
            alt={pokemon.name.fr} 
            className="w-32 h-32 object-cover mx-auto mt-2 rounded"
            onClick={() => setSelectedPokemon(pokemon)}/>
            
            <p>{pokemonTypes.map(pt => (
                <span key={pt.id} className="flex items-center space-x-2 mt-5">
                    <img src={pt?.image} alt={pt?.name.fr} width="6" className="w-6 h-6 object-cover" />
                    <span>{language ? pt?.name.en : pt?.name.fr}</span>
                </span>
            ))}</p>
            {selectedPokemon && (
                <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 w-300 h-150">
                        <button onClick={() => setSelectedPokemon(null)} className="absolute top-15 right-41 p-2 m-2 bg-gray-600 text-white rounded">X</button>
                        <div className='flex flex-col mr-150'>
                            <p className='text-2xl font-bold'>#{selectedPokemon.id}, {language ? selectedPokemon.name.en : selectedPokemon.name.fr}, g: {pokemon.generation}</p>
                            <label>
                                <input type="checkbox" checked={shiny} onChange={(e) => setShiny(e.target.checked)}/>
                            </label>
                            <img src={shiny ? selectedPokemon.image_shiny : selectedPokemon.image} alt={selectedPokemon.name.fr} className="w-64 h-64 object-cover mx-auto rounded"/>
                        </div>
                        <div className='absolute top-55 right-180'>
                            <p>{pokemonTypes.map(pt => (
                            <span key={pt.id} className="flex items-center space-x-2 mt-5 text-center">
                                <img src={pt?.image} alt={language ? pt?.name.en : pt?.name.fr} width="6" className="w-12 h-12 object-cover" />
                                <span>{language ? pt?.name.en : pt?.name.fr}</span>
                            </span>
                            ))}</p>
                        </div>
                        <div>
                            <div className='absolute top-110 left-90'>   
                                <p className='text-xl'>{language ? 'Height' : 'Taille'}: {Math.round(selectedPokemon.height*100)/100}m</p>
                            </div>
                            <div className='absolute top-110 right-175'>
                                <p className='text-xl'>{language ? 'Weight' : 'Poids'}: {Math.round(selectedPokemon.weight*100)/100}kg</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className='text-xl absolute top-127 right-300'>{language ? 'Abilities' : 'Capacités'}:</p>
                                <ul className='grid grid-cols-6 gap-0 mt-45 ml-10'>
                                    <p className='border border-black w-20'>{language ? 'HP' : 'PV'}: {selectedPokemon.stats.hp}</p>
                                    <p className='border border-black w-20'>{language ? 'Attack' : 'Attaque'}: {selectedPokemon.stats.atk}</p>
                                    <p className='border border-black w-20'>{language ? 'Defense' : 'Défense'}: {selectedPokemon.stats.def}</p>
                                    <p className='border border-black w-20'>{language ? 'Specail Atk' : 'Attaque Spe'}: {selectedPokemon.stats.spe_atk}</p>
                                    <p className='border border-black w-20'>{language ? 'Specail Def' : 'Défense Spe'}: {selectedPokemon.stats.spe_def}</p>
                                    <p className='border border-black w-20'>{language ? 'Speed' : 'Vitesse'}: {selectedPokemon.stats.vit}</p>
                                </ul>
                            </div>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}