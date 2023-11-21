/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8by18wbee1qu8gu")

  // remove
  collection.schema.removeField("ttusrgfg")

  return dao.saveCollection(collection)
})
