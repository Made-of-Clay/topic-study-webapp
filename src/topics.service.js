export default class TopicsService {
    constructor() {
        this.topicUrl = 'http://adamleis.com/topic-study/api/wp-json/wp/v2';
        this.source = null;
    }

    getTopics() {
        return axios.get(`${this.topicUrl}/tags`)
            .then(response => response.data)
            .catch(handleError)
        ;
    }

    getTopicList(id) {
        if (this.source) {
            this.source.cancel('The previous request was not finished; cancellling previous request');
        }
        this.source = axios.CancelToken.source();
        let url = `${this.topicUrl}/topic?tags=${id}`;
        let data = { cancelToken: this.source.token };

        return axios.get(url, data)
            .then(result => {
                this.source = null;
                return result;
            })
            .catch(handleError);
    }
}
function handleError(error) {
    console.error('Topics Request Error >> ', error);
}