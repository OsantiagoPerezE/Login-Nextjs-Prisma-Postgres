'use client';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {signIn} from 'next-auth/react';
import {useState} from 'react';

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm();
	const router = useRouter();
	const [error, setError] = useState(null);

	const onSubmit = handleSubmit(async (data) => {
		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});
		if (res.error) {
			setError(res.error);
		} else {
			router.push('/dashboard');
		}
	});

	return (
		<div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
			<form onSubmit={onSubmit} className='w-1/4'>
				{error && <p className='bg-red-500 text-lg text-white p-3 rounded'>{error}</p>}

				<h1 className='text-slate-200 font-bold text-4xl mb-4'>Login</h1>
				<label htmlFor='email' className='text-slate-500 mg-2 block text-sm'>
					Email
				</label>
				<input
					className='p-3 rounded block bg-slate-900 text-slate-300 mb-2 w-full'
					type='email'
					{...register('email', {
						required: {value: true, message: 'Email is required'},
					})}
					placeholder='user@email.com'
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

				<button
					type='submit'
					className='w-full bg-blue-500 text-white p-3 rounded-lg mt-4'
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
