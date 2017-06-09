<template>
    <div class="topic-list">
        <div class="topic-search-filter">
            <input type="text"
                class="topics-filter-input"
                placeholder="Filter Topics"
                v-model="searchTerm">

            <p class="default-content" v-if="topicsEmpty">
                Fetching topics...
            </p>

            <p class="no-filtered-topics" v-if="!viewableTopics.length && !topicsEmpty">
                There are no topics matching "{{searchTerm}}".
            </p>

                    <!-- v-if="filterTopic(searchTerm, topic.slug, topic.name)" -->
            <div v-for="topic of viewableTopics" v-if="viewableTopics.length">
                <div class="topic-name"
                    @click="updateCurrentTopic(topic)">
                    
                    {{topic.name}} ({{topic.count}})
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'topics',
    data() {
        return {
            // topics: [],
            searchTerm: ''
        };
    },
    dependencies: ['topicsService'],
    computed: {
        topicsEmpty() {
            return this.topics.length === 0;
        },
        viewableTopics() {
            return this.topics.filter(topic => {
                let searched = this.searchTerm;
                return searched
                    ?!!(topic.slug.match(searched) || topic.name.match(searched))
                    : true;
            });
        },
        topics() {
            return this.$store.state.topics;
        }
    },
    created() {
        this.getTopics();
    },
    methods: {
        getTopics() {
            if (this.topicsEmpty) {
                this.topicsService.getTopics()
                    .then(topics => this.$store.commit('setTopics', topics))
                ;
            }
        },
        updateCurrentTopic({id, name}) {
            // this.$emit('topicPostsLoading', true);
            // this.$store.commit('setTopicPostsLoading', true);
            // this.topicsService.getTopicList(id)
            //     .then(topicPosts => this.$store.commit('setTopicsPosts', topicPosts.data))
            //     .then(() => this.$store.commit('setTopicPostsLoading', false))
            // ;
            console.log('topics updateCurrentTopic')
            this.$store.commit('setCurrentTopic', {
                id: id,
                name: name
            });
        }
    }
};
</script>

<style scoped>
.topic-name {
    cursor: pointer;
    padding: 0.25em;
    transition: all 0.3s;
    user-select: none;
}
.topic-name:hover {
    background-color: #ffff52;
    color: rgba(0, 0, 0, 65);
}
.topics-filter-input {
    display: inline-block;
    margin-bottom: 0.5em;
    padding: 0.25em;
    width: 90%;
}
</style>
