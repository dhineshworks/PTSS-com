# How it works

Deep mode: what the site's JavaScript is made of and what its start page did while we watched.

## Its JavaScript

Analysed 37 script(s) from https://www.adaptedmind.com/login: 27 module(s), 143 endpoint(s), 3 route(s), bundled with webpack.

Evidence ev_e0b3a9d0fcf91653dcda7ac9eb28b9504b9b9b01202613d92963f617ceea9f84.

```json
{
  "api_operations": [],
  "app_kind": "unknown",
  "bundlers": [
    "webpack"
  ],
  "edges": [
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#1083",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#1083@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#1528",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#1528@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#1528",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#r@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#1528",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#t@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#1863"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3241"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3304"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3878"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#6154"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#860"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9119"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9324"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9422"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#944"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9908"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#B@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#L.addEventListener(loadend)@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#P@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#f@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2122",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#t@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2123",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2123@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2123",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#r@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2123",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#v@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2733",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2733@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2733",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#eM@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2733",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#g@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2733",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#m@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2733",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#p@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2733",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#si@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3197",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#860"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3197",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3197@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3197",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#K@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3197",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#s@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3592",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#1083"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3592",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#5289"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3592",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#6154"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3592",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#6773"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3592",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3592@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3592",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#t@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3304"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#WL@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#c@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#h@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#o@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#u@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3762",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#uR@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3304"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3606"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#384"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4903"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#520"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#5436"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#5519"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#5732"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#6459"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#7295"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#860"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9300"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9566"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#981"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9908"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#Aggregate@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#f@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#g@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#m@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#p@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#this.ee.on(long-task)@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#v@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#w.constructor@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#w.reportContainerEvent@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#w.serializer@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3845",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#w.storeXhr@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4284",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#6154"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4284",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4284@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4284",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#p@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4284",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#s@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#1863"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#2733"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3592"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3606"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3962"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#3969"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4903"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#5181"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#520"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#5344"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#5519"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#6154"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#6459"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#7779"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#860"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9119"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9300"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9566"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#981"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "requires",
      "to": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#9908"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#Aggregate@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#I.constructor@2"
    },
    {
      "from": "bundle-module:js-agent.newrelic.com/nr-spa-1.324.1.min.js#4393",
      "kind": "defines",
      "to": "fn:js-agent.newrelic.com/nr-spa-1.324.1.min.js#I.getInteractionFor@2"
  
```

## Ten seconds of it

Watched https://www.adaptedmind.com/login for 10000ms: 1 request outline(s), 5 console entr(y/ies).

Evidence ev_6d28013d4004c3910d9507c437f7ff2616d678507dbb651a443d3dd45949ef9c.

```json
{
  "accessibility": null,
  "console": {
    "count": 5,
    "entries": [
      {
        "level": "error",
        "source": "console-api"
      },
      {
        "level": "log",
        "source": "console-api"
      },
      {
        "level": "log",
        "source": "console-api"
      },
      {
        "level": "error",
        "source": "console-api"
      },
      {
        "level": "verbose",
        "source": "recommendation"
      }
    ],
    "has_text": false
  },
  "dom": {
    "attribute_names": [
      "action",
      "alt",
      "aria-atomic",
      "aria-controls",
      "aria-expanded",
      "aria-haspopup",
      "aria-hidden",
      "aria-label",
      "aria-labelledby",
      "aria-live",
      "aria-modal",
      "as",
      "async",
      "charset",
      "checked",
      "class",
      "content",
      "crossorigin",
      "d",
      "data-cf-beacon",
      "data-cookieconsent",
      "data-domain-script",
      "data-id",
      "data-n-css",
      "data-n-g",
      "data-n-p",
      "data-next-head",
      "data-nosnippet",
      "data-optanongroupid",
      "data-ot-ignore",
      "data-rr-ui-event-key",
      "defer",
      "fill",
      "fill-rule",
      "for",
      "href",
      "http-equiv",
      "id",
      "integrity",
      "lang",
      "method",
      "name",
      "nomodule",
      "ot-accordion",
      "ot-button-order",
      "placeholder",
      "rel",
      "role",
      "sandbox",
      "sizes",
      "src",
      "style",
      "tabindex",
      "target",
      "title",
      "type",
      "value",
      "viewbox",
      "x",
      "xml:space",
      "xmlns",
      "xmlns:xlink",
      "y"
    ],
    "elements_by_name": {
      "a": 15,
      "body": 2,
      "br": 1,
      "button": 16,
      "div": 80,
      "fieldset": 1,
      "footer": 1,
      "form": 1,
      "g": 2,
      "h1": 1,
      "h2": 1,
      "h3": 2,
      "h4": 4,
      "head": 2,
      "html": 2,
      "iframe": 1,
      "img": 4,
      "input": 11,
      "label": 7,
      "legend": 1,
      "li": 1,
      "link": 21,
      "meta": 5,
      "nav": 4,
      "next-route-announcer": 1,
      "noscript": 1,
      "p": 7,
      "path": 4,
      "script": 42,
      "section": 4,
      "span": 28,
      "style": 3,
      "svg": 4,
      "title": 4,
      "ul": 1
    },
    "text_nodes": 63,
    "total_nodes": 376,
    "truncated": false
  },
  "dropped_events": 0,
  "frame_origins": [
    "about:blank",
    "https://www.adaptedmind.com"
  ],
  "network": {
    "request_count": 1,
    "requests": [
      {
        "initiator": "script",
        "method": "POST",
        "mime_type": "text/plain",
        "response_headers": {
          "credentials_present": [],
          "kept": {
            "access-control-allow-credentials": {
              "value_length": 4
            },
            "access-control-allow-origin": {
              "value_length": 27
            },
            "alt-svc": {
              "value_length": 19
            },
            "cache-control": "no-cache, no-store, must-revalidate",
            "cf-cache-status": {
              "value_length": 7
            },
            "cf-ray": {
              "value_length": 20
            },
            "content-security-policy-report-only": "script-src 'none'; form-action 'none'; frame-src 'none'; report-uri https://csp.withgoogle.com/csp/scaffolding/ascnsrsggc:201:0",
            "content-type": "text/plain",
            "cross-origin-opener-policy-report-only": {
              "value_length": 39
            },
            "cross-origin-resource-policy": "cross-origin",
            "date": {
              "value_length": 29
            },
            "expires": {
              "value_length": 29
            },
            "pragma": {
              "value_length": 8
            },
            "priority": {
              "value_length": 5
            },
            "report-to": {
              "value_length": 141
            },
            "server": {
              "value_length": 10
            },
            "server-timing": {
              "value_length": 8
            },
            "strict-transport-security": "max-age=31536000; includeSubDomains",
            "x-content-type-options": "nosniff"
          }
        },
        "status": 204,
        "type": "Fetch",
        "url": "https://www.adaptedmind.com/xahk/ag/g/c?v=2&tid=G-QVP0MW8BJP&gtm=45g92e6bh1v887006215za20czb9115932451zd9115932451xf4&_p=1795429302045&gcs=G111&gcd=13t3t3t3t5l1&npa=0&dma=0&gdid=dY2E1Nz.dYWJhMj.dNzQzZD&_eu=EAACACQC&_uip=%3A%3A&cid=1801676097.1795429232&fp=1&frm=0&ibt=1&ir=1&ngs=1&pscdl=noapi&rcb=11&sr=800x600&uaa=x86&uab=64&uafvl=Not-A.Brand%3B99.0.0.0%7CGoogle%2520Chrome%3B157.0.8103.80%7CChromium%3B157.0.8103.80&uam=&uamb=0&uap=Windows&uapv=19.0.0&uaw=0&ul=en-gb&ur=IN-TN&_gsid=Ue7jROXVZ9Pet-N_2LWI8gpsQSbcnGZTFA&_s=3&tag_exp=115616986~115938465~115938469~120213116~120385423~120469145~120469153~121246026~121246034&sid=1795429231&sct=1&seg=1&dl=https%3A%2F%2Fwww.adaptedmind.com%2Flogin&dt=AdaptedMind&gtb=2&_tu=CA&en=page_view&gap.gtb=2&tfd=5944"
      }
    ]
  },
  "origin": "https://www.adaptedmind.com/login",
  "resources": [
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://assets.adaptedmind.com/vod/adaptedmind.adaptedmind/images/monster-logo.png"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.adaptedmind.com/_next/static/chunks/framework-66ffbd0463589e3b.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.adaptedmind.com/_next/static/chunks/webpack-d3ab72e71fc65009.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.adaptedmind.com/_next/static/f400d1e0f728d56d61ec3e0271378cfd64cbad83/_buildManifest.js"
    },
    {
      "mime_type": "image/jpeg",
      "type": "Image",
      "url": "https://assets.adaptedmind.com/vod/adaptedmind.adaptedmind/imagesprodold/homepage-9.jpg"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://cdn.cookielaw.org/logos/static/powered_by_logo.svg"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://cdn.cookielaw.org/consent/812b1c8d-47ed-4442-90db-4eac46b7126d/OtAutoBlock.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/login-43164988bde4d345.js"
    },
    {
      "mime_type": "application/octet-stream",
      "type": "Font",
      "url": "https://assets.adaptedmind.com/fonts/msans.woff2"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.adaptedmind.com/_next/static/chunks/main-c4a700cbbca718b0.js"
    },
    {
      "mime_type": "font/woff2",
      "type": "Font",
      "url": "https://assets.adaptedmind.com/fonts/FuturaStd-Medium.woff2"
    },
    {
      "mime_type": "application/x-font-ttf",
      "type": "Font",
      "url": "https://assets.adaptedmind.com/fonts/Lucida-Grande.ttf"
    },
    {
      "mime_type": "image/svg+xml",
      "type": "Image",
      "url": "https://assets.adaptedmind.com/vod/adaptedmind.adaptedmind/plato/topnav/icon_hamburger.svg"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.adaptedmind.com/_next/static/f400d1e0f728d56d61ec3e0271378cfd64cbad83/_ssgManifest.js"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://assets.adaptedmind.com/vod/adaptedmind.adaptedmind/images/logo-white.png"
    },
    {
      "mime_type": "image/png",
      "type": "Image",
      "url": "https://cdn.cookielaw.org/logos/aa52a672-b310-4969-a58b-8c8db9c5ba10/773bc9d8-1dbc-4591-a6aa-03ce52f85b9f/04487ae4-bedc-40f5-a8ec-1ae315ce531d/AM-Math_AppIcon_AM-Math_Ico-1024.png"
    },
    {
      "mime_type": "application/javascript",
      "type": "Script",
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/_app-2c254abf22ab878b.js"
    }
  ],
  "scripts": [
    {
      "length": 129,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/login"
    },
    {
      "length": 7055,
      "source_map_url": null,
      "url": "https://cdn.cookielaw.org/consent/812b1c8d-47ed-4442-90db-4eac46b7126d/OtAutoBlock.js"
    },
    {
      "length": 27863,
      "source_map_url": null,
      "url": "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
    },
    {
      "length": 7005,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/webpack-d3ab72e71fc65009.js"
    },
    {
      "length": 189857,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/framework-66ffbd0463589e3b.js"
    },
    {
      "length": 148054,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/main-c4a700cbbca718b0.js"
    },
    {
      "length": 771312,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/_app-2c254abf22ab878b.js"
    },
    {
      "length": 6857,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/login-43164988bde4d345.js"
    },
    {
      "length": 28074,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/f400d1e0f728d56d61ec3e0271378cfd64cbad83/_buildManifest.js"
    },
    {
      "length": 77,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/f400d1e0f728d56d61ec3e0271378cfd64cbad83/_ssgManifest.js"
    },
    {
      "length": 616630,
      "source_map_url": null,
      "url": "https://cdn.cookielaw.org/scripttemplates/202610.1.0/otBannerSdk.js"
    },
    {
      "length": 31853,
      "source_map_url": null,
      "url": "https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092"
    },
    {
      "length": 530827,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/xahk/"
    },
    {
      "length": 31251,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/info/contact-eba59fab0c2af66a.js"
    },
    {
      "length": 359999,
      "source_map_url": null,
      "url": "https://www.googletagmanager.com/gtm.js?id=GTM-W6B2JDHS"
    },
    {
      "length": 4403,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/info/guarantee-4404c2ee1cd12452.js"
    },
    {
      "length": 6642,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/info/testimonials-6754e252b255c21a.js"
    },
    {
      "length": 5714,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/forgot-password-a70d839da83742eb.js"
    },
    {
      "length": 5323,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/info/scholarships-22d9d9269a66941e.js"
    },
    {
      "length": 4781,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/info/about-a86ec9ef08ad6e83.js"
    },
    {
      "length": 2996,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/info/legal-76d71a610d9963ec.js"
    },
    {
      "length": 55837,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/2831-5c558c03e9804d5a.js"
    },
    {
      "length": 565,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/pages/info/privacy-4dd6b2d821798f49.js"
    },
    {
      "length": 56037,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/1529-267c6b3b0dfd11c3.js"
    },
    {
      "length": 66033,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/_next/static/chunks/9594-a14119f553ac2c06.js"
    },
    {
      "length": 611621,
      "source_map_url": null,
      "url": "https://www.googletagmanager.com/gtag/js?id=G-QVP0MW8BJP"
    },
    {
      "length": 641715,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/xahk/P_AFRTcrDWH-c4TV598WgOwGYElQKmFLeRluKTPSCN1pfj6_"
    },
    {
      "length": 468595,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/xahk/P_AFRTcrCxuCHeTUnLkW959gYElQKmFLeRluKTPSCN1pfj6_"
    },
    {
      "length": 391958,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/xahk/P_AFRTcrHw2CFOPVmL8X8pR7dwxLbz8OOAp3eTqDW4ljJws-vw"
    },
    {
      "length": 468595,
      "source_map_url": null,
      "url": "https://www.adaptedmind.com/xahk/P_AFRTcrCxuCHeTUnLkW9JdhYElQKmFLeRluKTPSCN1pfj6_"
    },
    {
      "length": 52310,
      "source_map_url": null,
      "url": "https://www.google-analytics.com/analytics.js"
    },
    {
      "length": 551654,
      "source_map_url": null,
      "url": "https://analytics.tiktok.com/i18n/pixel/static/main.MTUyMzg1YjAxOQ.js"
    },
    {
      "length": 139540,
      "source_map_url": null,
      "url": "https://analytics.tiktok.com/i18n/pixel/static/identify_f7846436.js"
    },
    {
      "length": 120024,
      "source_map_url": null,
      "url": "https://js-agent.newrelic.com/nr-spa-1.324.1.min.js"
    },
    {
      "length": 8027,
      "source_map_url": null,
      "url": "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/801618596/?random=1795429302178&cv=11&fst=1795429302178&bg=ffffff&guid=ON&async=1&en=gtag.config&gtm=45892e6bh1z8d_AW-801618596za20czb9115932451zd9115932451xecxf4&gcd=13t3t3t3t5l1&dma=0&tag_exp=115938465~115938468~120385422~120469145~120469153~121246026~121246034~123322201&u_w=800&u_h=600&url=https%3A%2F%2Fwww.adaptedmind.com%2Flogin&rcb=12&frm=0&tiba=AdaptedMind&did=dY2E1Nz%2CdYWJhMj&gdid=dY2E1Nz.dYWJhMj.dNzQzZD&hn=www.googleadservices.com&npa=0&pscdl=noapi&auid=781068529.1795429232&uaa=x86&uab=64&uafvl=Not-A.Brand%3B99.0.0.0%7CGoogle%2520Chrome%3B157.0.8103.80%7CChromium%3B157.0.8103.80&uamb=0&uam=&uap=Windows&uapv=19.0.0&uaw=0&_tu=CA&gtb=2&data=event%3Dgtag.config&gap.gtb=2&ept=9&rfmt=3&fmt=4"
    },
    {
      "length": 8027,
      "source_map_url": null,
      "url": "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/801618617/?random=1795429302191&cv=11&fst=1795429302191&bg=ffffff&guid=ON&async=1&en=gtag.config&gtm=45892e6bh1z8d_AW-801618617za20czb9115932451zd9115932451xecxf4&gcd=13t3t3t3t5l1&dma=0&tag_exp=115938465~115938469~120385423~120469145~120469153~121246026~121246034~123322201&u_w=800&u_h=600&url=https%3A%2F%2Fwww.adaptedmind.com%2Flogin&rcb=14&frm=0&tiba=AdaptedMind&did=dY2E1Nz%2CdYWJhMj&gdid=dY2E1Nz.dYWJhMj.dNzQzZD&hn=www.googleadservices.com&npa=0&pscdl=noapi&auid=781068529.1795429232&uaa=x86&uab=64&uafvl=Not-A.Brand%3B99.0.0.0%7CGoogle%2520Chrome%3B157.0.8103.80%7CChromium%3B157.0.8103.80&uamb=0&uam=&uap=Windows&uapv=19.0.0&uaw=0&_tu=CA&gtb=2&data=event%3Dgtag.config&gap.gtb=2&ept=9&rfmt=3&fmt=4"
    },
    {
      "length": 7186,
      "source_map_url": null,
      "url": "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D5EPE4BC77U4SF97DLC0&lib=ttq"
    }
  ],
  "scripts_truncated": false,
  "secret_redactions": 0,
  "storage_keys": null,
  "watch_ms": 10000,
  "websockets": {
    "connections": [],
    "frames": []
  }
}
```
