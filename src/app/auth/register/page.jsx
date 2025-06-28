'use client';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';

const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();
	const router = useRouter();

	const onSubmit = handleSubmit(async (data) => {
		if (data.password !== data.confirmPassword) return alert('Password do not match');

		const response = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				username: data.username,
				email: data.email,
				password: data.password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const resJSON = await response.json();

		if (response.ok) {
			router.push('/auth/login');
		} else {
			alert(resJSON.message || 'Error during registration');
			return;
		}
	});

	return (
		<div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
			<form onSubmit={onSubmit} className='w-1/4'>
				<h1 className='text-slate-200 font-bold text-4xl mb-4'>Register</h1>
				<label htmlFor='username' className='text-slate-500 mg-2 block text-sm'>
					Username
				</label>
				<input
					className='p-3 rounded block bg-slate-900 text-slate-300 mb-2 w-full'
					type='text'
					{...register('username', {
						required: {value: true, message: 'Username is required'},
					})}
					placeholder='Username123'
				/>
				{errors.username && (
					<span className='text-red-500'>{errors.username.message}</span>
				)}
				<label htmlFor='email' className='text-slate-500 mg-2 block text-sm'>
					Email
				</label>
				<input
					className='p-3 rounded block bg-slate-900 text-slate-300 mb-2 w-full'
					type='email'
					{...register('email', {
						required: {value: true, message: 'Email is required'},
					})}
					placeholder='email@email.com'
				/>
				{errors.email && <span className='text-red-500'>{errors.email.message}</span>}
				<label htmlFor='password' className='text-slate-500 mg-2 block text-sm'>
					Password
				</label>
				<input
					className='p-3 rounded block bg-slate-900 text-slate-300 mb-2 w-full'
					type='password'
					{...register('password', {
						required: {value: true, message: 'Password is required'},
					})}
					placeholder='********'
				/>
				{errors.password && (
					<span className='text-red-500'>{errors.password.message}</span>
				)}
				<label htmlFor='confirmPassword' className='text-slate-500 mg-2 block text-sm'>
					Confirm Password
				</label>
				<input
					className='p-3 rounded block bg-slate-900 text-slate-300 mb-2 w-full'
					type='password'
					{...register('confirmPassword', {
						required: {
							value: true,
							message: 'Confirm Password is required',
						},
					})}
					placeholder='********'
				/>
				{errors.confirmPassword && (
					<span className='text-red-500'>{errors.confirmPassword.message}</span>
				)}
				<button
					type='submit'
					className='w-full bg-blue-500 text-white p-3 rounded-lg mt-4'
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterPage;
