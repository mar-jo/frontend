<template>
	<input
		class="login-input"
		type="text"
		placeholder="Enter Username"
		v-model="username"
	/>
	<input
		class="login-input"
		type="password"
		placeholder="Enter Password"
		v-model="password"
        
	/>
    <button type="button" @click="loginUI">Login</button>
</template>

<script>

import { login } from "@/api";
export default {
	name: "LoginForms",
	data() {
		return {
			username: null,
			password: null,
		}; 
	},
	methods: {
		loginUI() {
			login(this.username, this.password)
		},
	},
};
</script>