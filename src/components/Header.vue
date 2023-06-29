
<script>
import { ref } from "vue";
import LoginRegisterModal from "@/components/LoginSignup/LoginRegisterModal.vue";
export default {
	name: "Header",
	setup() {
		const isModalOpen = ref(false);

		const toggleModal = () => {
			isModalOpen.value = !isModalOpen.value;
		};
		
		return {
			toggleModal,
			isModalOpen,
		};
	},
	components: {
		LoginRegisterModal
	}
};
</script>

<template>
	<header>
		<div>
			<h1>ToDo Manager</h1>
			<button type="button" @click="toggleModal">LoginModal</button>
		</div>
		<LoginRegisterModal :isOpen="isModalOpen" :toggleModal="toggleModal" />
	</header>
</template>