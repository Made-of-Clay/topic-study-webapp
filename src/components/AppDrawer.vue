<template>
    <aside class="app-drawer"
        :class="{'is-showing':topicListShowing}">
        <topics
            @topicLoading="notifyTopicLoading"
            @topicLoaded="passTopicData"
            @topicPostsLoading="notifyTopicPostsLoading"
            @topicPostsLoaded="notifyTopicPostsLoaded"></topics>
    </aside>
</template>

<script>
import Topics from './Topics';

export default {
    name: 'app-drawer',
    components: {
        'topics': Topics
    },
    props: ['topicListShowing'],
    methods: {
        notifyTopicLoading(isLoading) {
            // TODO: is this necessary?
            this.$emit('topicLoading', isLoading);
        },
        notifyTopicPostsLoading(isLoading) {
            this.$emit('topicPostsLoading', isLoading);
        },
        passTopicData(topicData) {
            this.$emit('updateTopicData', topicData);
        },
        notifyTopicPostsLoaded(topicPosts) {
            this.$emit('updateTopicPosts', topicPosts);
        }
    }
};
</script>

<style scoped>
.app-drawer {
    background-color: white;
    box-shadow: 0 0 2px #aaa, 0 8px 12px rgba(119, 119, 119, 0.5);
    box-sizing: border-box;
    height: 100%;
    padding: 1em;
    position: absolute;
    top: 0;
    transition: all 0.3s;
    transform: translateX(-15em);
    width: 15em;
    z-index: 10;
}
.app-drawer.is-showing {
    transform: translateX(0);
}
</style>
