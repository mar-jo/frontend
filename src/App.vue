<script>
import Modal from "./components/LoginSignup/Modal.vue";
import TodoList from "@/components/TodoList.vue";
import { abtest, logout } from "@/api";
import featureConfig from "@/featureToggles/featureConfig"; 
import createToggleRouter from "@/featureToggles/featureToggleRouter";


export default {
	components: {
		Modal,
		TodoList,
	},
	data() {
		return {
			isLoggedIn: false,
			showModal: false,
			username: "",
			whichModal: "",
			toggleRouter: createToggleRouter(featureConfig),
			ABTestResFeatName: "show-abtest-result",
			groups: 
			{
				"btn-1": 0,
				"btn-2": 0
			}
		};
	},
	computed: {
		registerButtonClass() {
			console.log(this.groups);
			const group =
			Math.random() < 0.5
			? Object.keys(this.groups)[0]
			: Object.keys(this.groups)[1];
			if (!localStorage.getItem("btn-group")) {
				localStorage.setItem("btn-group", group);
				console.log("NN", localStorage);
			}
			return group;
		},
		registerButtonLabel() {
			if (this.registerButtonClass === Object.keys(this.groups)[0]) {
				return "Register Now!";
			} else {
				return "Register";
			}
		},
	},
	created() {
		this.toggleRouter.setFeature(this.ABTestResFeatName, true);
		this.calculateABTestRes();
	},
	methods: {
		showLoginModal() {
			this.whichModal = "login";
			this.showModal = true;
		},
		showRegisterModal() {
			this.showModal = true;
			this.whichModal = "register";
		},
		closeModal() {
			this.showModal = false;
		},
		login(username) {
			this.isLoggedIn = true;
			this.username = username;
			this.showModal = false;
		},
		register() {
			this.calculateABTestRes();
		},
		async calculateABTestRes(){
			this.groups = await abtest();
		},
		logoutUI() {
			logout();
			console.log();
			this.isLoggedIn = false;
			this.username = "";
		},
	},
};
</script>

<template>
	<div>
		<header>
			<h1>ToDo Manager</h1>
			<div v-if="!isLoggedIn">
				<button
					type="button"
					class="btn btn-success m-1"
					@click="showLoginModal"
				>
					Login
				</button>

				<button @click="showRegisterModal" :class="registerButtonClass" id="registerBtn">
					{{ registerButtonLabel }}
				</button>
			</div>
			<div v-if="isLoggedIn">
				<h2>Welcome, {{ username }}!</h2>
				<button @click="logoutUI">Logout</button>
			</div>
			<div v-if="this.toggleRouter.featureIsEnabled(this.ABTestResFeatName)">
				<table class="table">
					<thead>
						<tr>
							<th scope="col">Group Name</th>
							<th scope="col">Click Through Rate</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(value, key) in groups">
							<td>{{ key }}</td>
							<td>{{ value }}</td>
						</tr>
					</tbody>
				  </table>
			</div>
		</header>

		<main v-if="isLoggedIn">
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

.btn-1 {
	background-color: #007fff;
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
	/* Add other styles for variation A */
}

.btn-2 {
	background-color: #ff0000;
	/* Add other styles for variation B */
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
</style>
