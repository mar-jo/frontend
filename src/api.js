import axios from "axios";

const register = async (username, password) => {
	console.log("in register", {username: password});
	let res = await axios.post("http://localhost:8080/todos/register", {
		username: username,
		password: password,
	});
	return res.data;
};

const login = async (username, password) => {
	console.log("in login:", {username: username}, {password: password});
	let res = await axios.post("http://localhost:8080/todos/login", {
		username: username,
		password: password,
	});
	return res.data;
};


const readTodos = async () => {
	let res = await axios.get("http://localhost:8080/todos");

	return res.data;
};

const createTodo = async (name) => {
	let res = await axios.post("http://localhost:8080/todos", {
		name: name,
	});

	return res.data;
};

const doneTodo = async (id) => {
	let res = await axios.put(`http://localhost:8080/todos/${id}/done`);

	return res.data;
};

const undoneTodo = async (id) => {
	let res = await axios.delete(`http://localhost:8080/todos/${id}/done`);

	return res.data;
};

export { login, register, readTodos, createTodo, doneTodo, undoneTodo };
