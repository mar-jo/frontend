<template>
	<div class="Todos">
		<ul>
			<li>
				<TodoInput @new-todo="post" />
			</li>
			<li v-for="(todo, i) in todos">
				<Todo :todo="todo" @done="done" @undone="undone" />
			</li>
		</ul>
	</div>
	 
	
	<button @click="toggleDoneTodos">Done Todos</button>
	<div v-if="showDoneTodos" class="done-todos">
		<ul>	
			<li v-for="todo in donetodos">
				<!-- <h4>{{ day }}</h4> -->
				<!-- <div v-for="todo in donetodos[day]"> -->
					<Todo :todo="todo" @done="done" @undone="undone" />
				<!-- </div> -->
			</li>
		</ul>
	</div>
</template>

<script>
import Todo from "@/components/Todo.vue";
import TodoInput from "@/components/TodoInput.vue";
import { createTodo, doneTodo, readTodos, undoneTodo } from "@/api";
import featureConfig from "../featureToggles/featureConfig";
import createToggleRouter from "../featureToggles/featureToggleRouter";


export default {
	name: "TodoList",
	components: { TodoInput, Todo },
	data() {
		return {
			toggleRouter: createToggleRouter(featureConfig),
			showDoneTodos: false,
			todos: [],
			donetodos: [],
			sortedAndGroupedByDayDoneTodos: {},
			days: [],
			
			sortFeature: "sort-feature" 
		};
	},
	setup() {
	},
	methods: {
		sortAndGroupByDay(array) {
			const sortedArray = array.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
			const groupedByDay = {};
			
			sortedArray.forEach((element) => {
				const day = element.updatedAt.slice(0, 10); // Extract day from the updatedAt string
				if (!groupedByDay[day]) {
					groupedByDay[day] = [];
				}
				groupedByDay[day].push(element);
			});
			console.log("AKDOJDALKGJBADLKGJBADGLK", groupedByDay);
			return groupedByDay;
		},
		async getAllSorted(){ 
			const allTodos = await readTodos();
			this.todos = allTodos.filter(todo => !todo.done);
			this.donetodos = allTodos.filter(todo => todo.done);
			this.sortedAndGroupedByDayDoneTodos = this.sortAndGroupByDay(allTodos);
			console.log("BRRRUHHHHHH", this.sortedAndGroupedByDayDoneTodos);
		},
		async getAll() {
			this.todos = await readTodos();
		},
		async post(name) {
			var todo = await createTodo(name);
			this.todos.push(todo);
		},
		async done(id) {
			console.log(id);
			var todo = await doneTodo(id);
			this.update(id, todo, true);
		},
		async undone(id) {
			var todo = await undoneTodo(id);
			this.update(id, todo, false);
		},
		update(id, todo, isDone) {
			if(this.toggleRouter.featureIsEnabled(this.sortFeature)){
				if(isDone){
					this.removeFromList(this.todos, id);
					this.donetodos.push(todo);	
				} else {
					this.removeFromList(this.donetodos, id);
					this.todos.push(todo);
				}
			} else {
				this.todos.forEach((value, i) => {
					if (value.id === id) {
						this.todos[i] = todo;
					}
				});
			}
		},
		toggleDoneTodos(){
			this.showDoneTodos = !this.showDoneTodos;
			console.log(this.sortedAndGroupedByDayDoneTodos);
		},
		removeFromList(list, id) {
			const index = list.findIndex(item => item.id === id);
			const itemToRemove = list.find(item => item.id === id);
			if (index > -1) {
				list.splice(index, 1);
				return itemToRemove;
			}
		}
	},
	created() {
		this.toggleRouter.setFeature(this.sortFeature, true);
		if(this.toggleRouter.featureIsEnabled(this.sortFeature)){
			this.getAllSorted();
		} else {
			this.getAll();
		}
	},
};
</script>

<style scoped>
ul {
	list-style-type: none;
}
</style>
