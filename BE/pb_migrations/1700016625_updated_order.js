/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wz4epi0vab0ftds")

  // remove
  collection.schema.removeField("ymczatpc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7xvjibqp",
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
  const collection = dao.findCollectionByNameOrId("wz4epi0vab0ftds")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ymczatpc",
    "name": "orderId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qsnjsj9yvrxyazr",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("7xvjibqp")

  return dao.saveCollection(collection)
})
