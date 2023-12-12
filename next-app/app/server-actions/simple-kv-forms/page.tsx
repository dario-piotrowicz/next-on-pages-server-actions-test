import { revalidatePath } from 'next/cache';

export const runtime = 'edge';

export default async function SimpleKvFormsPage() {
	async function set(formData: FormData) {
		'use server';
		const myKv = process.env.MY_KV;
		await myKv.put('key', formData.get('value')?.toString() ?? '');
		revalidatePath('/server-actions');
	}

	async function del() {
		'use server';
		const myKv = process.env.MY_KV;
		await myKv.delete('key');
		revalidatePath('/server-actions');
	}

	const myKv = process.env.MY_KV;
	const value = await myKv.get('key');

	return (
		<main>
			{value !== null ? <p>The key's value is "{value}"</p> : <p>No value is set for the key</p>}
			<br />
			<form action={!value ? set : del}>
				{!value && (
					<>
						<label htmlFor="value">Set value to: </label>
						<input type="text" id="value" name="value" required />
						<br />
					</>
				)}
				<button>{!value ? 'Set value' : 'Delete value'}</button>
			</form>
		</main>
	);
}
