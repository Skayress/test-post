import { defineStore } from "pinia";
import axios from "axios";

const postsURL = 'https://jsonplaceholder.typicode.com/posts?_limit=10'
const usersURL = 'https://jsonplaceholder.typicode.com/users'

export const usePostStore = defineStore('postsStore', {
	state: () => ({
		posts: [],
		users: [],
		loader: false
	}),
	getters: {
		getUserById: (state) => (id) => {
			return state.users.find(user => user.id === id);
		}
	},
	actions: {
		async getPosts() {
			this.loader = true
			const response = await axios.get(postsURL)
			const data = await response.data
			this.posts = data
			this.loader = false
		},
		async getUsers() {
			const response = await axios.get(usersURL)
			const data = await response.data
			this.users = data
		}
	}
})