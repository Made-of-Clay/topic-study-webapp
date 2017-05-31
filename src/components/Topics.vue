<template>
    <div class="topic-list">
        <div class="topic-search-filter">
            <input type="text"
                class="topics-filter-input"
                placeholder="Filter Topics" 
                :model="searchTerm">

            <p class="default-content" v-if="topicsEmpty">
                Fetching topics...
            </p>

                    <!-- v-if="filterTopic(searchTerm, topic.slug, topic.name)" -->
            <div v-for="topic of topics" v-if="!topicsEmpty">
                <div class="topic-name"
                    @click="getTopicPosts(topic.id, topic.name)">
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
            topics: {},
            searchTerm: ''
        };
    },
    computed: {
        topicsEmpty() {
            return Object.keys(this.topics).length === 0;
        }
    },
    created(topicsService) {
        this.topicsService = topicsService;
        this.$emit('topicLoading', true);
        this.getTopics();
    },
    methods: {
        getTopics() {
            if (this.topicsEmpty) {
                this.topicsService.getTopics()
                    .then(topics => this.topics = topics)
                    .then(() => this.$emit('topicLoading', false))
                ;
            }
        },
        getTopicPosts(id, name) {
            this.$emit('topicPostsLoading', true);
            this.topicsService.getTopicList()
                .then()
        }
    }
};
</script>
