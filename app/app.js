(function () {
    var app = new Vue({
        el: '#app',

        data: {
            // variables the template
            // foo: null
            topicData: {tagName:null}
        },

        // watch (, created, destroyed, etc...) are life-cycle hooks
        watch: {
            // watch variables (.data) for changes & do something
            // foo: 'bar'
        },

        methods: {
            // methods for template
            // bar() {
            //     console.log('do the thing');
            // }
            toggleTopicList(event) {
                console.log('foo');
            }
        }
    });
})();
