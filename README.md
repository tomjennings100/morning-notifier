#Overview

##Concept
This application takes a ingests content and allows users to create feeds of classes within it. The resultant feeds can be edited by the end user and then published to clients via an array of media.

##Architecture

Ingestion nodes periodically scrape a table of predefined feeds (initially feeds, move on to scrapers). Each new item in a feed is pushed to a queue and run through a classification pluggable pipeline. Classification data is associated with the article *post hoc*. 

When a user wishes to generate a report, he initiates the web-app and selects which report he wishes to generate. He can then add, delete, edit and rearrange articles, which are persisted at both the front and back ends. When he has finished creating the report, he can send it via a variety of media, save it via the webapp, and view analytics associated with it. 


