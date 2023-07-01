<template>
	<div @close="onClose">
		<div slot="body">
			<form @submit.prevent="onSubmit">
				<div
					class="form-item"
					:class="{ errorInput: $v.username.$error }"
				>
					<label>Username</label>
					<p class="errorText" v-if="!$v.username.required">
						Username is required
					</p>
					<p class="errorText" v-if="!$v.username.minLength">
						Username is not correct
					</p>
					<input
						v-model="username"
						:class="{ error: $v.username.$error }"
						@change="$v.username.$touch"
					/>
				</div>
				<div
					class="form-item"
					:class="{ errorInput: $v.password.$error }"
				>
					<label>Password</label>
					<p class="errorText" v-if="!$v.password.required">
						Password is required
					</p>
					<input
						type="password"
						v-model="password"
						:class="{ error: $v.password.$error }"
						@change="$v.password.$touch"
					/>
				</div>
				<button class="btn btnPrimary">Login</button>
			</form>
		</div>
		<div slot="switch">
			<button class="btn btnWhite" @click="$emit('switch')">
				Don't have an account? Register
			</button>
		</div>
	</div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import login from "../../api";

export default {
	data() {
		return {
			username: "",
			password: "",
		};
	},
	validations: {
		username: {
			required,
		},
		password: {
			required,
		},
	},
	methods: {
		onSubmit() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				login(this.username, this.password);

				this.username = "";
				this.password = "";
				this.$v.$reset();
				this.$emit("close");
			}
		},
		onClose() {
			this.username = "";
			this.password = "";
			this.$v.$reset();
			this.$emit("close");
		},
	},
};
</script>

<style scoped>
/* Styles for the ModalLogin component */
</style>
