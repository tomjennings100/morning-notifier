const { Article, Articles } = require('./models/article');
const { Feed, Feeds } = require('./models/feed');
const parseFeed = require('./lib/parse_feed');
const sendToQueue = require('./lib/queue/send');

init();

async function init() {
    const feeds = await Feeds.forge().fetch();
    feeds.forEach(async feed => {
        try {
            const completedFeed = await processFeed(feed);
            setInterval(() => { processFeed(feed) }, feed.get('interval'));
        }
        catch (e) {
            return console.error(e)
        }
    })
}


async function processFeed(feed) {
    try {
        var items = await parseFeed(feed.get('url'));
    } 
    catch (err) {
        return new Error(`Error parsing feed: ${err}`)
    }

    items.forEach(async parsedItem => {
        const { title, description, date, source, link } = parsedItem;
        const item = {
            headline: title,
            body: description,
            feed_object: parsedItem,
            feed_id: feed.get('id'),
            published_date: date,
            url: link
        };

        try {
            const a = await Article.forge(item).upsert();
            sendToQueue(a.get('url'));
        } catch (err) {
            console.log(err.detail)
        }
    });
    return items;
}