import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        topics: [],
        topicPosts: [],
        currentTopic: {
            id: '',
            name: ''
        },
        drawerShowing: true,
        topicPostsLoading: false
    },
    actions: {

    },
    mutations: {
        setTopics(state, newTopics) {
            state.topics = newTopics;
        },
        setTopicsPosts(state, newTopicPosts) {
            state.topicPosts = newTopicPosts;
        },
        setCurrentTopic(state, curTopic) {
            state.currentTopic = curTopic;
        },
        setDrawerShowing(state, showing) {
            state.drawerShowing = showing;
        },
        setTopicPostsLoading(state, loading) {
            state.topicPostsLoading = loading;
        }
    },
    getters: {}
});

export default store;
