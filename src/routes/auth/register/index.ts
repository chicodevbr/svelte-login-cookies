import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';

import { db } from '$lib/database';

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const username = form.get('username');
	const password = form.get('password');

	if (typeof username !== 'string' || typeof password !== 'string') {
		return {
			status: 400,
			body: {
				error: 'Invalid username or password'
			}
		};
	}

	try {
		await db.user.create({
			data: {
				username,
				passwordHash: await bcrypt.hash(password, 10)
			}
		});

		return {
			status: 201,
			body: {
				success: 'Success.'
			}
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'Internal server error'
			}
		};
	}
};
