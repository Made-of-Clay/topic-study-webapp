<template>
    <div class="app-content">
        <div class="loader" :class="{'is-showing':topicPostsLoading}">
            <svg class="circular" height="50" width="50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="6" stroke-miterlimit="10" />
            </svg>
        </div>

        <topic-posts :posts="topicData"></topic-posts>
    </div>
</template>

<script>
import TopicPosts from './TopicPost';

export default {
    name: 'app-content',
    props: ['topicPostsLoading', 'topicData'],
    components: {
        'topic-posts': TopicPosts
    },
    methods: {
        sendTopicName(name) {
            this.$emit('updateTopicName', name);
        }
    }
};
</script>

<style scoped>
.app-content {
    box-sizing: border-box;
    padding: 1em;
    width: 100%;
}
@media screen and (min-width: 800px) {
    .is-showing + .app-content {
        padding-left: 16em;
    }
}
</style>
