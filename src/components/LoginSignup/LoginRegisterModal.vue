<template>
	<div class="modal">
		<div v-if="isOpen" class="mx-auto max-w-xl px-2 sm:px-0">
			<TabGroup>
				<TabList class="flex rounded-xl bg-blue-900/20 p-1 space-x-1">
					<Tab as="template" v-slot="{ selected }">
						<button
							:class="[
								'w-full rounded-lg py-2.5 p-4 font-medium leading-5 text-slate-800 text-blue-700',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
								selected
									? 'bg-white shadow'
									: 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
							]"
						>
							Login
						</button>
					</Tab>
					<Tab as="template" v-slot="{ selected }">
						<button
							:class="[
								'w-full rounded-lg py-2.5 p-4 font-medium leading-5 text-blue-700',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
								selected
									? 'bg-white shadow'
									: 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
							]"
						>
							Register
						</button>
					</Tab>
				</TabList>
				<TabPanels class="mt-2">
					<TabPanel
						class="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
					>
						<Login />
					</TabPanel>
					<TabPanel
						class="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
					>
						<Register />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	</div>
</template>

<script>
import Login from "@/components/LoginSignup/Login.vue";
import Register from "@/components/LoginSignup/Register.vue";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

export default {
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
		toggleModal: {
			type: Function,
			required: true,
		},
	},
	components: {
		Login,
		Register,
		Tab,
		TabGroup,
		TabList,
		TabPanel,
		TabPanels,
	},
};
</script>
