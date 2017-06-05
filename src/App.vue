<template>
    <div class="app-wrapper">
        <app-header @toggleDrawer="toggleDrawer"
            :topicPosts="topicPosts"></app-header>

        <div class="content-wrapper">
                <!-- @topicLoading="setTopicLoading" -->
            <app-drawer :topicListShowing="topicListShowing"
                @topicPostsLoading="setTopicPostsLoading"
                @updateTopicPosts="setTopicPosts"></app-drawer>
            <app-content :topicPostsLoading="topicPostsLoading"
                :topicPosts="topicPosts"></app-content>
        </div>
    </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';

export default {
    name: 'app-wrapper',
    data() {
        return {
            // topicListShowing: true,
            // topicLoading: false, // TODO: maybe remove this
            // topicPostsLoading: false,
            topicPosts: []
        };
    },
    computed: {
        currentTopic() {
            if (this.topicPosts.length) {

            }
        },
        drawerShowing() {
            return this.$store.drawerShowing;
        },
        topicPostsLoading() {
            return this.$store.topicPostsLoading;
        }
    },
    components: {
        'app-header': AppHeader,
        'app-drawer': AppDrawer,
        'app-content': AppContent
    },
    methods: {
        toggleDrawer() {
            // this.topicListShowing = !this.topicListShowing;
            this.$store.commit('setDrawerShowing', !this.drawerShowing);
        },
        // setTopicLoading(isLoading) {
            // this.topicLoading = isLoading;
        // },
        setTopicPostsLoading(isLoading) {
            this.topicPostsLoading = isLoading;
        },
        setTopicPosts(topicPosts) {
            this.topicPosts = topicPosts;
        }
    },
    created() {
        this.topicListShowing = !smallScreen();
    }
}
function smallScreen() {
    return window.innerWidth < 800;
}
</script>

<style>
.content-wrapper {
    position: relative;
    height: calc(100% - 4em);
}
</style>
