<template>
    <div class="app-content">
        <div class="loader" :class="{'is-showing':topicPostsLoading}">
            <svg class="circular" height="50" width="50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="6" stroke-miterlimit="10" />
            </svg>
        </div>

        <topic-posts :posts="topicPosts"></topic-posts>
    </div>
</template>

<script>
import TopicPosts from './TopicPost';

export default {
    name: 'app-content',
    props: ['topicPostsLoading', 'topicPosts'],
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
.loader {
    height: 100%;
    left: 0;
    position: fixed;
    transition: transform 0.2s;
    transform: scale(0);
    transform-origin: 50% 22%;
    top: 0;
    width: 100%;
    z-index: 100;
}
.loader.is-showing {
    transform: scale(1);
}

.circular {
    animation: rotate 2s linear infinite;
    height: 50px;
    left: calc(50% - 25px);
    position: absolute;
    top: 20%;
    width: 50px;
}

.path {
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
  animation: 
   dash 1.5s ease-in-out infinite,
   color 2s ease-in-out infinite
  ;
  stroke-linecap: round;
  stroke: #3f88f8;
  stroke: #7c43bd;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -124;
  }
}
</style>
