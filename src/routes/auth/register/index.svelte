<script lang="ts">
	import { send } from '$lib/api';

	export let error: string;
	export let success: string;

	async function register(event: SubmitEvent) {
		error = '';

		const formEl = event.target as HTMLFormElement;
		const response = await send(formEl);

		if (response.error) {
			error = response.error;
		}

		if (response.success) {
			success = response.success;
		}

		formEl.reset();
	}
</script>

<form on:submit|preventDefault={register} method="POST">
	<div>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" required />
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" required />
	</div>
	{#if error}
		<p class="error">{error}</p>
	{/if}

	{#if success}
		<div>
			<p>Thank you for signup</p>
			<p>
				<a href="/auth/login">You can log in.</a>
			</p>
		</div>
	{/if}
	<button type="submit">Sign Up</button>
</form>

<style>
	.error {
		color: tomato;
	}
</style>
