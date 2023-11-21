/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8by18wbee1qu8gu")

  // remove
  collection.schema.removeField("ttusrgfg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2tnaoi6d",
    "name": "picture",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8by18wbee1qu8gu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ttusrgfg",
    "name": "picture",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("2tnaoi6d")

  return dao.saveCollection(collection)
})
