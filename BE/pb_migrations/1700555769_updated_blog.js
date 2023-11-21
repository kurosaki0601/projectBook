/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9hybf21w91pglto")

  // remove
  collection.schema.removeField("jre8bo3e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2rz5grl2",
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
  const collection = dao.findCollectionByNameOrId("9hybf21w91pglto")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jre8bo3e",
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
  collection.schema.removeField("2rz5grl2")

  return dao.saveCollection(collection)
})
