<template v-if="currentForm === 'login'">
	<!-- Login form -->
	<form @submit.prevent="onLogin">
		<div class="input-group flex-nowrap">
			<span class="input-group-text" id="addon-wrapping">@</span>
			<input type="text" class="form-control" placeholder="Username" v-model="username" aria-label="Username" aria-describedby="addon-wrapping" required>
		</div>
		<div class="input-group flex-nowrap">
			<span class="input-group-text" id="addon-wrapping">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
					<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
				  </svg>
			</span>
			<input type="password" class="form-control" placeholder="Password" v-model="password" aria-label="Password" aria-describedby="addon-wrapping" required>
		</div>
		<button @click="onSubmit" class="btn btn-success">Login</button>
	</form>
</template>

<script>
import { login } from "../../api";

export default {
	data() {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		async onSubmit() {
			// Perform login logic
			await login(this.username, this.password)
				.then((loginRes) => {
					this.$emit('login', loginRes.user.username);
					alert(loginRes.message);
				})
				.catch((error) => {
					console.log("Login failed: ", error);
					window.alert(error.message);
				})
				.finally(() => {
					this.username = "";
					this.password = "";
				});
		},
		onClose() {
			this.username = "";
			this.password = "";
			this.$emit("close");
		},
	},
};
</script>

<style scoped>
/* Styles for the ModalLogin component */

</style>
