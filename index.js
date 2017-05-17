const { Article, Articles } = require('./models/article');
const { Feed, Feeds } = require('./models/feed');
const Queue = require('./lib/queue');
const parseFeed = require('./lib/parse_feed');

Feeds.forge().fetch().then(feeds => {
    feeds.forEach((feed) => {
        parseFeed(feed.get('url'))
            .then((items) => {
                items.forEach( parsedItem =>{
                    const {title, description, date, source, link} = parsedItem; 
                    const item = {
                        headline: title, 
                        body: description, 
                        feed_object: source,
                        feed_id: feed.get('id'), 
                        published_date: date, 
                        url: link
                    }; 
                    
                        Article.forge(item).save(null, {method: 'insert'}).then(a=>{
                            console.log(a.get('headline'))
                        })
                        .catch(console.trace); 
                })
            })
            .catch(console.trace)
    })
})
.catch(console.trace); 




