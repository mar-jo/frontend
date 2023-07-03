<template>
	<div>
		<header>
			<h1>ToDo Manager</h1>
			<div v-if="!isLoggedIn">
				<button type="button" class="btn btn-success m-1" @click="showLoginModal">Login</button>

				<button type="button" class="btn btn-success m-1" @click="showRegisterModal">Register</button>
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
			:currentForm="whichModal"
			@close="closeModal"
			@login="login"
			@register="register"
			@logout="logoutUI"
		/>
	</div>
</template>

<script>
import Modal from "./components/LoginSignup/Modal.vue";
import TodoList from "@/components/TodoList.vue";
import { logout } from "@/api";

export default {
	data() {
		return {
			isLoggedIn: false,
			showModal: false,
			username: "",
			whichModal: ""
		};
	},
	methods: {
		showLoginModal() {
			this.whichModal = "login";
			this.showModal = true;
			console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNLKFNLGAKNSALKNGALKSNGLKASNGLKn");
		},
		showRegisterModal() {
			this.whichModal = "register";
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		},
		login(username) {
			this.isLoggedIn = true;
			this.username = username;
			this.showModal = false;
		},
		register(username) {
			this.isLoggedIn = true;
			this.username = username;
			this.showModal = false;
		},
		logoutUI() {
			logout();
			this.isLoggedIn = false;
			this.username = "";
		},
	},
	components: {
		Modal,
		TodoList,
	},
};
</script>

<style>
button {
	background-color: rgb(66, 184, 131);
	border-radius: 8px;
	border-style: none;
	box-sizing: border-box;
	color: #ffffff;
	cursor: pointer;
	display: inline-block;
	font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
		sans-serif;
	font-size: 14px;
	font-weight: 500;
	height: 40px;
	line-height: 20px;
	list-style: none;
	margin: 1em;
	outline: none;
	padding: 10px 16px;
	position: relative;
	text-align: center;
	text-decoration: none;
	transition: color 100ms;
	vertical-align: baseline;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
}

button:hover,
button:focus {
	background-color: rgb(100, 250, 180);
}
</style>
