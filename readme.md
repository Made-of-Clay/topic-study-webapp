# Topic Study Web App
Topic Study is a personal project focusing on general topics and Bible verses or inspiring commentary on said topic.

## Dev Notes
### API Endpoint
Using WordPress REST API for data/content. Examples below are assuming WP REST API's base directory.

**Examples**
`/wp-json/wp/v2/verses?filter[tag]=holyspirit` - get all post type *verses* tagged with *holyspirit*
`/wp-json/wp/v2/tags` - get all tags

Tags are the topics that will be studied. I've chosen to organize the data this way for the following reasons:
1. The grouping makes sense (i.e. one topic may have many verses/quotes related to it)
2. It's conveniently already a part of WordPress

### Planned Post Types
- verses
- quotes

### Hierarchy Notes
#### Topics
- Prayer
- Holy Spirit

#### Verses/Quotes (VQs)
- John 3:16

#### Component Tree
    topic-study-app
        h1
        
        (home)
        input:search
        topic-card

        (topic)
        h2
        div.topic-filters
        topic-post

        (topic-post)
        <topic stuff>
        modal-detail
            span.icon-close
            p.post-content
            span.post-attrib

#### Verse/Quote (VQ)
- "For God so loved the world that He gave..."

### Page Descriptions
#### Home -- /
- h1 saying "Topic Study"
- prominent search input to filter showing topics
- list of topics (w/ count of things within topic)
- clicking on a topic navigates

#### Topic -- /topic/:topic-slug (/topic/holy-spirit)
- h1 saying "Topic Study"
- back (arrow) button
- h2 saying topic name
- radios acting as filters (All, Verses, Quotes)
- list of verses/quotes w/ post title displaying
- clicking on verse/quote expands detail box (modal dialog)

#### Topic Post Detail -- /topic/:topic-slug/:post-slug (/topic/holy-spirit/john-3-16-17)
- modal dialog overlaying Topic page
- content of post
- beneath that, verse/quote author showing in quote-like format

### Misc Notes
- Footer section will have Topics(/Home), About links

### General Steps
1. Show list of topics
2. Click topic for list & nav to /topic/:topic-slug
3. Show (fetched) list of verses/quotes
4. Click verse
5. Modal dialog shows with post's content and title
6. Offer back btn/link (eventually other post in topic)