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

#### Verse/Quote (VQ)
- "For God so loved the world that He gave..."

### General Steps
1. Show list of topics
2. Click topic for list (data fetch or cached)
3. Show (fetched) list of verses/quotes
4. Click verse (data fetch or cached)
5. Navigate to verse detail (ref, txt)
6. Offer back btn/link (eventually other vq in topic)