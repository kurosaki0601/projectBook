/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8by18wbee1qu8gu")

  // remove
  collection.schema.removeField("2tnaoi6d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7uicghva",
    "name": "picture",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8by18wbee1qu8gu")

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

  // remove
  collection.schema.removeField("7uicghva")

  return dao.saveCollection(collection)
})
