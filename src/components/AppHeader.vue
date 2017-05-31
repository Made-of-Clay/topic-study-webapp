<template>
    <header class="app-header background-color-primary">
        <button class="icon-menu"
            @click="toggleTopicList">
            <img src="../assets/ic_menu_white_24px.svg" alt="☰">
        </button>
        <h1 class="app-header-heading">
            <span>Topic Study</span>
            <span class="topic-name" v-if="topicData.tagName">
                {{topicData.tagName}}
            </span>
        </h1>
    </header>
</template>

<script>
export default {
    name: 'app-header',
    data() {
        return {
            topicData: {}
        };
    },
    methods: {
        toggleTopicList() {
            this.$emit('toggleTopicList');
        }
    }
};
</script>

<style scoped>
.app-header {
    padding: 0.5em;
}
.app-header-heading {
    display: inline-block;
    font-size: 1em;
    margin: 0 0 0 0.5em;
    vertical-align: middle;
}
@media screen and (min-width: 340px) {
    font-size: 1.25em;
}
@media screen and (min-width: 475px) {
    font-size: 1.75em;
}
.icon-menu {
    background-color: transparent;
    border: none;
    display: inline-block;
    padding: 0.5em 0.75em;
    vertical-align: middle;
}
.topic-name::before {
    content: ':';
    display: inline-block;
    margin-right: 0.5em;
}
</style>
