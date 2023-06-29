<template>
	<input
		class="register-input"
		type="text"
		placeholder="Enter Username"
		v-model="username"
	/>
	<input
		class="register-input"
		type="password"
		placeholder="Enter Password"
		v-model="password"
        
	/>
    <button type="button" @click="registerUI">register</button>
</template>

<script>

import { register } from "@/api";
export default {
	name: "registerForms",
	data() {
		return {
			username: null,
			password: null,
		};
	},
	methods: {
		registerUI() {
			register(this.username, this.password)
		},
	},
};
</script>