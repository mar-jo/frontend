<template>
	<transition name="modal">
		<div class="modal__wrapper" @click="$emit('close')">
			<div class="modal-content" @click.stop>
				<!-- modal header -->
				<div class="modal-header">
					<span class="modal-title"></span>
					<span class="button-close" @click="$emit('close')">×</span>
				</div>

				<!-- modal body -->
				<div class="modal-body">
					<template v-if="currentForm === 'login'">
						<!-- Login form -->
						<form @submit.prevent="onLogin">
							<div class="form-item">
								<label>Username</label>
								<input
									type="text"
									v-model="loginUsername"
									required
								/>
							</div>
							<div class="form-item">
								<label>Password</label>
								<input
									type="password"
									v-model="loginPassword"
									required
								/>
							</div>
							<button class="btn btnPrimary">Login</button>
						</form>
					</template>

					<template v-else-if="currentForm === 'register'">
						<!-- Register form -->
						<form @submit.prevent="onRegister">
							<div class="form-item">
								<label>Username</label>
								<input
									type="text"
									v-model="registerUsername"
									required
								/>
							</div>
							<div class="form-item">
								<label>Password</label>
								<input
									type="password"
									v-model="registerPassword"
									required
								/>
							</div>
							<button class="btn btnPrimary">Register</button>
						</form>
					</template>

					<!-- Switch button -->
					<div class="switch-button">
						<button class="btn btnWhite" @click="switchForm">
							{{
								currentForm === "login"
									? "Don't have an account? Register"
									: "Already have an account? Login"
							}}
						</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import {login, register} from '../../api.js'

export default {
	props: {
		// title: {
		// 	type: String,
		// 	required: true,
		// },
	},
	data() {
		return {
			currentForm: "login",
			loginUsername: "",
			loginPassword: "",
			registerUsername: "",
			registerPassword: "",
		};
	},
	methods: {
		switchForm() {
			this.currentForm =
				this.currentForm === "login" ? "register" : "login";
		},
		async onLogin() {
			// Perform login logic using this.loginUsername and this.loginPassword
			// Reset form fields if needed
			login(this.loginUsername, this.loginPassword)
				.then((loginRes) => {
					
					// Access the returned values here
					console.log(loginRes);
					// Perform any additional actions based on the returned values
					// Redirect to the homepage or handle the response as needed
					this.$emit('login', loginRes.user.username);
					alert(loginRes.message);
					//window.location.href = "http://localhost:5173/todos/";
				})
				.catch((error) => {
					console.log("Error in login: ", error);
					window.alert(error.message);
				})
				.finally(() => {
					// Reset form fields if needed
					this.loginUsername = "";
					this.loginPassword = "";
				});
		},
		async onRegister() {
			// Perform registration logic using this.registerUsername and this.registerPassword
			// Reset form fields if needed
			let res;
			try {
				res = await register(this.registerUsername, this.registerPassword)
			} catch (error) {
				res = error;
			}
			window.alert(res);
			this.registerUsername = "";
			this.registerPassword = "";
		},
	},
	mounted() {
		document.body.addEventListener("keyup", (event) => {
			if (event.key === "Escape") {
				this.$emit("close");
				this.currentForm = "login";
				// Reset form fields if needed
				this.loginUsername = "";
				this.loginPassword = "";
				this.registerUsername = "";
				this.registerPassword = "";
			}
		});
	},
};
</script>

<style scoped>
.modal-enter,
.modal-leave-active {
	opacity: 0;
}
.modal-enter .modal-content,
.modal-leave-active .modal-content {
	transform: scale(1.2);
}

.modal__wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	transition: opacity 0.2s ease;
	right: 0;
	z-index: 998;
	background-color: rgba(00, 00, 00, 0.48);
}

.modal-content {
	position: relative;
	max-width: 600px;
	padding: 20px 18px;
	background-color: #fff;
	border: 1px solid #dcdfe6;
	transition: all 0.2s ease;
	border-radius: 8px;
	z-index: 999;
	overflow: hidden;
	@media screen and (min-width: 900px) {
		min-width: 500px;
	}
}
.modal-header {
	display: flex;
	align-self: center;
	justify-content: space-between;
	padding-bottom: 20px;
	span {
		font-size: 24px;
	}
	.button-close {
		cursor: pointer;
	}
}
.modal-body {
	text-align: center;
}

.form-item{
	color: black;
}
</style>
