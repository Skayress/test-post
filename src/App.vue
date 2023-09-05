<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePostStore } from './store/PostsStore';
import AppPost from './components/AppPost.vue';
import AppLoader from './components/AppLoader.vue'

const postsStore = usePostStore()

onMounted(() => {
	postsStore.getPosts()
	postsStore.getUsers()
})

const searchAuthor = ref('');

const filteredByUser = computed(() => {
	return postsStore.users.filter(user => {
		return user.name.toLowerCase().includes(searchAuthor.value.toLowerCase());
	});
});

const filteredPosts = computed(() => {
	return postsStore.posts.filter((post) => {
		return filteredByUser.value.some((user) => user.id === post.id);
	});
})

</script>

<template>
	<div class="container">
		<input class="search-input" type="text" placeholder="enter post author" v-model="searchAuthor">
		<div class="posts-list">
			<AppLoader v-if="postsStore.loader" />
			<AppPost v-else v-for="post in filteredPosts" :key="post.id" :post="post" :authorId="post.id" />
		</div>
	</div>
</template>

<style lang="scss">
@import './assets/styles/common.scss';

body {
	background: $bg;
}

.container {
	max-width: 960px;
	width: 100%;
	padding: 10px;
	margin: 0 auto;
}

.search-input {
	display: block;
	max-width: 300px;
	width: 100%;
	margin: 0 auto 20px;
	padding: 5px 10px;
	border: 1px solid gray;
	outline: none;
	border-radius: 10px;
}

.posts-list {
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
}
</style>
