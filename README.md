# Erised
[![Build Status](https://travis-ci.org/marvelm/erised.svg?branch=master)](https://travis-ci.org/marvelm/erised)
![Version](https://img.shields.io/npm/v/erised.svg?style=plastic)
```
Usage:
  erised list
  erised <url> [--tags=<tags>]

Options:
  --tags=<tags> String of tags (e.g. nodejs,backend,job)
```

## Examples
```
$ npm install -g erised
$ erised 'http://localhost:8000'
$ erised 'https://google.com'

$ erised list
{"id":1,"title":"Directory listing for /","url":"http://localhost:8000","html":"/home/user/.erised/archive/482157757.html","pdf":"/home/user/.erised/archive/482157757.pdf","screenshot":"/home/user/.erised/archive/482157757.png","createdAt":"2017-03-04T05:00:41.036Z","updatedAt":"2017-03-04T05:00:41.036Z"}
{"id":2,"title":"Google","url":"https://google.com","html":"/home/user/.erised/archive/107346023.html","pdf":"/home/user/.erised/archive/107346023.pdf","screenshot":"/home/user/.erised/archive/107346023.png","createdAt":"2017-03-04T05:14:27.823Z","updatedAt":"2017-03-04T05:14:27.823Z"}

$ erised list | grep 'google.com' | jq
{
  "id": 2,
  "title": "Google",
  "url": "https://google.com",
  "html": "/home/user/.erised/archive/107346023.html",
  "pdf": "/home/user/.erised/archive/107346023.pdf",
  "screenshot": "/home/user/.erised/archive/107346023.png",
  "createdAt": "2017-03-04T05:14:27.823Z",
  "updatedAt": "2017-03-04T05:14:27.823Z"
}
```

The archived webpages will be stored in `~/.erised`.
```
~/.erised
├── archive
│   ├── 482157757.html
│   ├── 482157757.pdf
│   └── 482157757.png
└── erised.sqlite3
```
