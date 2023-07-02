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

button {
  background-color: #42b883;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
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
  background-color: #28f498;
}
</style>
