<template>
    <div class="topics-wrapper">
        <article class="card" v-if="!posts.length">
            No topics have been loaded yet!
        </article>

        <article class="card" v-if="posts.length"
            v-for="post of posts">

            <span class="quote" v-bind:html="post.content.rendered"></span>
            <h1 class="quoted">{{post.title.rendered}}</h1>
        </article>
    </div>
</template>

<script>
export default {
    name: 'topic-posts',
    props: ['posts']
};
</script>
