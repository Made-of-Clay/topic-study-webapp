<template>
    <div class="topics-wrapper">
        <article class="card" v-if="!posts.length">
            No topics have been loaded yet!
        </article>

        - {{foo}} -

        <article class="card" v-if="posts.length"
            v-for="post of posts">

            <span class="quote" v-html="post.content.rendered"></span>
            <h1 class="quoted">{{post.title.rendered}}</h1>
        </article>
    </div>
</template>

<script>
export default {
    name: 'topic-posts',
    data() {
        return {
            loading: false,
            posts: [],
            foo: ''
        };
    },
    // props: ['posts'],
    watch: {
        posts() {
            let currentTopic = this.$store.state.currentTopic;
            if (currentTopic.id) {
                return this.getPosts(currentTopic.id)
                    // .
            }
        },
        foo() {
            if (this.$store.state.currentTopic.id) {
                this.foo = this.$store.state.currentTopic.id;
            }
        }
    },
    methods: {
        getPosts() {
            this.loading = true;
            this.topicsService.getTopicList(id)
                .then(posts => this.posts = posts);
        }
    }
};
</script>

<style scoped>
.topics-wrapper {
    margin: 0 auto;
    max-width: 900px;
}
.card {
    background-color: #fafafa;
    border-radius: 3px;
    box-shadow: 0 0 2px #aaa, 0 1px 5px rgba(119, 119, 119, 0.25);
    box-sizing: border-box;
    margin-bottom: 1em;
    padding: 0.75em;
}
.quote {
    display: block;
    position: relative;
}
.quote::before ,
.quote::after {
    color: rgba(0, 0, 0, 0.1);
    font-size: 11em;
    line-height: 0.5;
    position: absolute;
}
.quote::before {
    content: '\201c';
    left: 0;
    top: 5%;
}
.quote::after {
    content: '\201d';
    right: 0;
    top: 100%;
}

.quoted {
    font-size: 1.25em;
    text-align: right;
}
.quoted::before {
    content: '-';
    display: inline-block;
    margin-right: 0.5em;
}
</style>
