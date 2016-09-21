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
