import axios from "axios";
const port = 3000;
const url = `http://54.208.48.71:${port}/todos`; //54.208.48.71


const register = async (username, password) => {
	try {
		const res = await axios.post(`${url}/register`, {
			username: username,
			password: password,
			group: localStorage["btn-group"]
		});
		return res.data;
	} catch (error) {
		throw error.response.data;
	}
};

const setAuthToken = (token) => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const login = async (username, password) => {
	try {
		const res = await axios.post(`${url}/login`, {
			username: username,
			password: password,
		});
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
		unsetAuthToken();
		return res.data;
	} catch (error) {
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

const abtest = async () => {
	let res = await axios.get(`${url}/ab-test`);
	return res.data;
};



export { login, logout, register, readTodos, createTodo, doneTodo, undoneTodo, abtest };
