<script setup>
import { computed } from 'vue'
import { usePostStore } from './../store/PostsStore';

const postsStore = usePostStore()

const props = defineProps({
	post: {
		type: Object,
		required: true,
		default: () => { }
	},
	authorId: {
		type: Number,
		required: true
	}
})

const author = computed(() => {
	return postsStore.getUserById(props.authorId)
})

</script>

<template>
	<article class="post">
		<h3 class="post__title">
			{{ post.title }}
		</h3>
		<p class="post__text">
			{{ post.body }}
		</p>
		<address class="post__author">
			{{ author.name }}
		</address>
	</article>
</template>

<style lang="scss" scoped>
.post {
	display: flex;
	flex-direction: column;
	gap: 10px;
	max-width: 300px;
	padding: 10px;
	border: 1px solid gray;
	background: #fff;
	box-shadow: 0px 4px 19px 0px rgba(12, 57, 99, 0.10);

	&__title {
		color: $blue;
	}

	&__author {
		font-style: italic;
		font-size: 12px;
		margin-top: auto;
	}

	@media(max-width: 992px) {
		max-width: 48%;
	}

	@media(max-width: 576px) {
		max-width: 100%;
	}
}
</style>