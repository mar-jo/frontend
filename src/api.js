import axios from "axios";
const port = 3000;
const url = `http://54.208.48.71:${port}/todos`;


const register = async (username, password) => {
	console.log("in register", { username: password });
	try {
		const res = await axios.post(`${url}/register`, {
			username: username,
			password: password,
		});
		return res.data;
	} catch (error) {
		console.log("Error in reg: ", error);
		throw error.response.data;
	}
};

const setAuthToken = (token) => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const login = async (username, password) => {
	console.log("in login:", { username: username }, { password: password });
	try {
		const res = await axios.post(`${url}/login`, {
			username: username,
			password: password,
		});
		// Set the token in cookies
		console.log(res.data);
		setAuthToken(res.data.user.token);
		return res.data;
	} catch (error) {
		console.log("Error in login: ", error);
		throw error.response.data;
	}
};

const unsetAuthToken = () => {
	axios.defaults.headers.common["Authorization"] = "";
};
const logout = async () => {
	try {
		const res = await axios.post(`${url}/logout`);
		console.log(res.data);
		unsetAuthToken();
		return res.data;
	} catch (error) {
		console.log("Error in login: ", error);
		throw error.response.data;
	}
};


const readTodos = async () => {
	let res = await axios.get(`${url}`);

	return res.data;
};

const createTodo = async (name) => {
	let res = await axios.post(`${url}`, {
		name: name,
	});
	console.log("CREATE TODO", res);

	return res.data;
};

const doneTodo = async (id) => {
	let res = await axios.put(`${url}/${id}/done`);

	return res.data;
};

const undoneTodo = async (id) => {
	let res = await axios.delete(`${url}/${id}/done`);

	return res.data;
};



export { login, logout, register, readTodos, createTodo, doneTodo, undoneTodo };
