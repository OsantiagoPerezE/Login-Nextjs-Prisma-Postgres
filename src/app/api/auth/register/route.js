import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import {db} from '@/libs/db';

export async function POST(request) {
	try {
		const data = await request.json();

		// Verificar si el email ya existe
		const userFoundByEmail = await db.user.findUnique({
			where: {
				email: data.email,
			},
		});

		if (userFoundByEmail) {
			return NextResponse.json(
				{
					message: 'El email ya está registrado',
				},
				{
					status: 400,
				}
			);
		}

		// Verificar si el username ya existe
		const userFoundByUsername = await db.user.findUnique({
			where: {
				username: data.username,
			},
		});

		if (userFoundByUsername) {
			return NextResponse.json(
				{
					message: 'El nombre de usuario ya está en uso',
				},
				{
					status: 400,
				}
			);
		}
		const hashedPassword = await bcrypt.hash(data.password, 10);
		// Crear el nuevo usuario
		const newUser = await db.user.create({
			data: {
				username: data.username,
				email: data.email,
				password: hashedPassword,
			},
		});

		// No devolver la contraseña en la respuesta
		const {password, ...userWithoutPassword} = newUser;

		return NextResponse.json(userWithoutPassword);
	} catch (error) {
		console.error('Error in register API:', error);
		return NextResponse.json(
			{
				message: 'Error interno del servidor',
			},
			{
				status: 500,
			}
		);
	}
}
