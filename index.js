const { Article, Articles } = require('./models/article');
const { Feed, Feeds } = require('./models/feed');
const parseFeed = require('./lib/parse_feed');
const sendToQueue = require('./lib/queue/send');

Feeds.forge().fetch().then(feeds => {
    feeds.forEach((feed) => {
        processFeed(feed)
            .then(() => {
                setInterval(processFeed(feed), feed.get('interval'))
            })
    })
}).catch(console.trace);


function processFeed(feed) {
   return parseFeed(feed.get('url'))
        .then((items) => {
            items.forEach(parsedItem => {
                const { title, description, date, source, link } = parsedItem;
                const item = {
                    headline: title,
                    body: description,
                    feed_object: source,
                    feed_id: feed.get('id'),
                    published_date: date,
                    url: link
                };

                Article.forge(item).upsert().then(a => {                     
                    sendToQueue(a.get('url')); 
                }).catch(console.trace);
            })
        }).catch(console.trace)
}



