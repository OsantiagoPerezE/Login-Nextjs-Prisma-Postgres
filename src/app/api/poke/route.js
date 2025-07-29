import {db} from '@/libs/db';

export async function GET(req) {
	try {
		const pokemones = await db.pokemon.findMany({
			include: {
				tipos: {include: {tipo: true}},
				habilidades: {include: {habilidad: true}},
			},
		});
		return new Response(JSON.stringify(pokemones), {
			status: 200,
			headers: {'Content-Type': 'application/json'},
		});
	} catch (error) {
		return new Response(
			JSON.stringify({error: 'Error al consultar los pokemones', detalle: error.message}),
			{
				status: 500,
				headers: {'Content-Type': 'application/json'},
			}
		);
	}
}

export async function POST(req) {
	try {
		const body = await req.json();

		// Si es un solo objeto, lo convertimos en array para unificar el flujo
		const pokemones = Array.isArray(body) ? body : [body];

		// Validar que cada objeto tenga los campos requeridos
		for (const poke of pokemones) {
			if (!poke.nombre || !poke.id || !poke.imagen || !poke.altura || !poke.peso) {
				return new Response(JSON.stringify({error: 'Faltan campos obligatorios en uno o más pokemones'}), {
					status: 400,
					headers: {'Content-Type': 'application/json'},
				});
			}
		}

		// Guardar todos los pokemones en la base de datos
		const nuevosPokemones = await Promise.all(
			pokemones.map(async (poke) => {
				return await db.pokemon.create({
					data: {
						nombre: poke.nombre,
						numero: poke.id, // Usamos 'id' del array como 'numero' en la DB
						imagen: poke.imagen,
						altura: poke.altura,
						peso: poke.peso,
						// Aquí podrías agregar lógica para tipos y habilidades si lo necesitas
					},
				});
			})
		);

		return new Response(JSON.stringify(nuevosPokemones), {
			status: 201,
			headers: {'Content-Type': 'application/json'},
		});
	} catch (error) {
		return new Response(
			JSON.stringify({error: 'Error al guardar los pokemones', detalle: error.message}),
			{
				status: 500,
				headers: {'Content-Type': 'application/json'},
			}
		);
	}
}
