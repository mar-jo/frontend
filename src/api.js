import axios from "axios";

const setAuthToken = (token) => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const register = async (username, password) => {
	console.log("in register", { username: password });
	try {
		const res = await axios.post("http://localhost:8080/todos/register", {
			username: username,
			password: password,
		});
		return res.data;
	} catch (error) {
		console.log("Error in reg: ", error);
	}
};

const login = async (username, password) => {
	console.log("in login:", { username: username }, { password: password });
	try {
		const res = await axios.post("http://localhost:8080/todos/login", {
			username: username,
			password: password,
		});
		// Set the token in cookies
		setAuthToken(res.data.token);
		return res;
	} catch (error) {
		console.log("Error in login: ", error);
		return error.response.data.message;
	}
};


const readTodos = async () => {
	let res = await axios.get("http://localhost:8080/todos");

	return res.data;
};

const createTodo = async (name) => {
	let res = await axios.post("http://localhost:8080/todos", {
		name: name,
	});
	console.log("CREATE TODO", res);

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
