<template>
	<div>
		<header>
			<h1>My App</h1>
			<div v-if="!isLoggedIn">
				<button @click="showLoginModal">Login</button>
				<button @click="showRegisterModal">Register</button>
			</div>
		</header>

		<main v-if="isLoggedIn">
			<h2>Welcome, {{ username }}!</h2>
			<!-- Your main content for logged in users -->
		</main>

		<Modal
			v-if="showModal"
			:isRegister="registerModal"
			@close="closeModal"
		/>
	</div>
</template>

<script>
import Modal from "./components/LoginSignup/Modal.vue";

export default {
	data() {
		return {
			isLoggedIn: false,
			showModal: false,
			registerModal: false,
			username: "",
		};
	},
	methods: {
		showLoginModal() {
			this.showModal = true;
			this.registerModal = false;
		},
		showRegisterModal() {
			this.showModal = true;
			this.registerModal = true;
		},
		closeModal() {
			this.showModal = false;
		},
		login(username) {
			// Perform login logic
			this.isLoggedIn = true;
			this.username = username;
			this.showModal = false;
		},
		register(username) {
			// Perform registration logic
			this.isLoggedIn = true;
			this.username = username;
			this.showModal = false;
		},
		logout() {
			// Perform logout logic
			this.isLoggedIn = false;
			this.username = "";
		},
	},
	components: {
		Modal,
	},
};
</script>
