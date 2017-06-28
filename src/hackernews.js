const URL = require('url')
const querystring = require('querystring')

const Promise = require('bluebird')
const request = require('request-promise')

const fetch = require('./fetch')

function isHNPost (link) {
  const url = URL.parse(link)
  return url.hostname === 'news.ycombinator.com' &&
    url.pathname === '/item' &&
    querystring.parse(url.query).id
}

function fetchHNPost (link) {
  const url = URL.parse(link)
  const id = querystring.parse(url.query).id

  return Promise.join(
    fetch(link),
    request({uri: `https://hacker-news.firebaseio.com/v0/item/${id}.json`, json: true})
  ).spread((hnPage, apiRes) => {
    if (apiRes.url) {
      return fetch(apiRes.url)
        .then(articlePage => [hnPage, articlePage])
    }
    return [hnPage]
  })
}

module.exports = {
  isHNPost,
  fetchHNPost
}
