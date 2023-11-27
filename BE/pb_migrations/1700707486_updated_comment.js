/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("opq9wklxj4ott9p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jkllxdip",
    "name": "bookId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8by18wbee1qu8gu",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("opq9wklxj4ott9p")

  // remove
  collection.schema.removeField("jkllxdip")

  return dao.saveCollection(collection)
})
