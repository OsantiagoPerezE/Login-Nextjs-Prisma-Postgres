'use client';
import {signOut} from 'next-auth/react';
import {useEffect, useState} from 'react';

const DashboardPage = () => {
	const [listPokemon, setListPokemon] = useState([]);
	const [listPokemonDb, setListPokemonDb] = useState([]);

	useEffect(() => {
		GetPokemonDb();
	}, []);

	useEffect(() => {
		console.log('listPokemon >>>', listPokemon);
	}, [listPokemon]);

	useEffect(() => {
		console.log('listPokemonDb >>>', listPokemonDb);
	}, [listPokemonDb]);

	const GetPokemonDb = async () => {
		try {
			const res = await fetch('/api/poke');
			if (!res.ok) throw new Error('Error al obtener los Pokémon de la base de datos');
			const pokes = await res.json();
			setListPokemonDb(pokes);
			return pokes;
		} catch (error) {
			console.error(error);
		}
	};

	const GetPokemonInfo = async () => {
		try {
			const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
			const data = await respuesta.json();

			const detallesPromises = data.results.map(async (pokemon) => {
				const resDetalle = await fetch(pokemon.url);
				const detalle = await resDetalle.json();

				return {
					nombre: detalle.name,
					id: detalle.id,
					tipos: detalle.types.map((t) => t.type.name),
					habilidades: detalle.abilities.map((h) => h.ability.name),
					imagen: detalle.sprites.front_default,
					altura: detalle.height,
					peso: detalle.weight,
				};
			});

			const listaPokemones = await Promise.all(detallesPromises);
			setListPokemon(listaPokemones);
			return listaPokemones;
		} catch (error) {
			console.error('Error al obtener los Pokémon:', error);
		}
	};

	const PostPokemon = async () => {
		const post = await fetch('/api/poke', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(listPokemon),
		});
	};

	return (
		<section className='h-[calc(100vh-7rem)] flex justify-center items-center'>
			<div>
				<h1 className='text-white text-5xl'>Dashboard</h1>
				<button
					className='bg-white text-black px-4 py-2 rounded-md mt-4 cursor-pointer'
					onClick={() => signOut()}
				>
					Logout
				</button>

				<div className='flex justify-center items-center gap-2'>
					<button
						className='w-full bg-blue-500 text-white p-3 rounded-lg mt-4 cursor-pointer'
						onClick={GetPokemonInfo}
					>
						GetPokemonInfo
					</button>
					{listPokemon.length > 0 && (
						<button
							className='w-full bg-blue-700 text-white p-3 rounded-lg mt-4 cursor-pointer'
							onClick={PostPokemon}
						>
							PostPokemon
						</button>
					)}
				</div>
			</div>
		</section>
	);
};

export default DashboardPage;
