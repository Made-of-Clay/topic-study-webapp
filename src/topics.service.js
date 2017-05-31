export default class TopicsService {
    constructor() {
        this.topicUrl = 'http://adamleis.com/topic-study/api/wp-json/wp/v2';
    }

    getTopics() {
        return axios.get(`${this.topicUrl}/tags`)
            .then(response => response.data)
            .catch(handleError)
        ;
    }

    getTopicList(id) {
        return axios.get(`${this.topicUrl}/topic?tags=${id}`)
            .catch(handleError)
        ;
    }
}
function handleError(error) {
    console.error('Topics Request Error >> ', error);
}