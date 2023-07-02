<template>
	<div>
		<header>
			<h1>ToDo Manager</h1>
			<div v-if="!isLoggedIn">
				<button @click="showLoginModal">Login</button>
			</div>
			<div v-if="isLoggedIn">
				<h2>Welcome, {{ username }}!</h2>
				<button @click="logoutUI">Logout</button>
			</div>
		</header>

		<main v-if="isLoggedIn">
			<!-- Your main content for logged in users -->
			<main>
				<TodoList />
			</main>
		</main>

		<Modal
			v-if="showModal"
			:isRegister="registerModal"
			:isLoggedIn="isLoggedIn"
			@close="closeModal"
			@login="login"
			@logout="logoutUI"
		/>
	</div>
</template>

<script>
import Modal from "./components/LoginSignup/Modal.vue";
import TodoList from "@/components/TodoList.vue";
import {logout} from '@/api';


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
		closeModal() {
			this.showModal = false;
		},
		login(username) {
			// Perform login logic
			console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
		logoutUI() {
			logout();
			// Perform logout logic
			this.isLoggedIn = false;
			this.username = "";
		},
	},
	components: {
		Modal,
		TodoList
	},
};
</script>

<style>


</style>
