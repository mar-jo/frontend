<template>
	<transition name="modal">
		<div
			class="modal-dialog modal-lg bg-light modal-dialog-centered"
			@click="$emit('close')"
		>
		<div class="modal-content" @click.stop>
				<!-- modal header -->
				<div class="modal-header">
					<h2 class="modal-title">{{ currentForm.charAt(0).toUpperCase() + currentForm.slice(1) }}</h2>
					<span class="button-close" @click="$emit('close')">×</span>
				</div>

				<!-- modal body -->
				<div class="modal-body">
					<ModalLogin v-if="currentForm === 'login'" @login="login"/>
					<ModalRegister v-else-if="currentForm === 'register'" @register="register"/>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import ModalLogin from "@/components/LoginSignup/ModalLogin.vue";
import ModalRegister from "@/components/LoginSignup/ModalRegister.vue";

export default {
	components: {
		ModalLogin,
		ModalRegister,
	},
	props: {
		currentForm: {
			type: String,
			required: true,
		},
	},
	mounted() {
		console.log(this.currentForm);
		document.body.addEventListener("keyup", (event) => {
			if (event.key === "Escape") {
				this.$emit("close");
				this.currentForm = "login";
			}
		});
	},
	methods: {
		login(username){
			this.$emit('login', username);
		},
		register(){
			this.$emit('register');
		}
	}
};
</script>

<style>
.modal-body {
	margin: 1em;
	margin-right: 2.5em;
	overflow: hidden;
}

.input-group {
	margin-bottom: 1em;
}

.modal-content {
	padding: 4em;
	justify-content: center;
}
.modal-header {
	display: flex;
	align-self: center;
	justify-content: center;
	padding-bottom: 20px;
	color: black;
	span {
		font-size: 2em;
		position: absolute;
        top: 0px;
        right: 0px;
	}
}

.modal-body {
	text-align: center;
}

.form-item {
	color: black;
}

.button-close{
	color: black;
	cursor: pointer;
	position: absolute;
	top: 0px;
	right: -10em;
	align-items: flex-end;
}
</style>
