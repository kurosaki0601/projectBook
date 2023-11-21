/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9hybf21w91pglto")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xqizvfdg",
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
  const collection = dao.findCollectionByNameOrId("9hybf21w91pglto")

  // remove
  collection.schema.removeField("xqizvfdg")

  return dao.saveCollection(collection)
})
