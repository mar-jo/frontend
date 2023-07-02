import axios from "axios";
const port = 8080;
const url = `http://localhost:${port}`;

const setAuthToken = (token) => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const register = async (username, password) => {
	console.log("in register", { username: password });
	try {
		const res = await axios.post(url + "/todos/register", {
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
		const res = await axios.post(url + "/todos/login", {
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
	let res = await axios.get(url + "/todos");

	return res.data;
};

const createTodo = async (name) => {
	let res = await axios.post(url + "/todos", {
		name: name,
	});
	console.log("CREATE TODO", res);

	return res.data;
};

const doneTodo = async (id) => {
	let res = await axios.put(url + `/todos/${id}/done`);

	return res.data;
};

const undoneTodo = async (id) => {
	let res = await axios.delete(url + `/todos/${id}/done`);

	return res.data;
};



export { login, register, readTodos, createTodo, doneTodo, undoneTodo };
