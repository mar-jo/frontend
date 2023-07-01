<script>
import Login from "./LoginSignup/Login.vue";
import Register from "./LoginSignup/Register.vue";

export default {
	components: {
		Login: Login,
		Register: Register,
	},
	data() {
		return {
			modalFirst: false,
			modalSecond: {
				show: false,
				name: "",
				email: "",
			},
			Login: false,
			Register: false,
		};
	},
	methods: {},
};
</script>

<template>
	<div class="wrapper">
		<!-- <wrapper-header> -->

		<div class="wrapper-content">
			<h2>Todo Manager</h2>
		</div>
		<div class="wrapper-content">
			<section>
				<div class="container">
					<!-- Login with Validate -->
					<button class="btn btnPrimary" @click="Login = !Login">
						Login
					</button>
					<Login
						v-show="Login"
						@close="Login = false"
						@switch="
							Login = false;
							Register = true;
						"
					>
					</Login>

					<!-- Register with Validate -->
					<button
						class="btn btnPrimary"
						@click="Register = !Register"
					>
						Register
					</button>
					<Register
						v-show="Register"
						@close="Register = false"
						@switch="
							Register = false;
							Login = true;
						"
					>
					</Register>
				</div>
			</section>
		</div>

		<!-- <wrapper-footer> -->
	</div>
</template>
