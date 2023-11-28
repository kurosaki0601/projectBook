/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9hybf21w91pglto")

  // remove
  collection.schema.removeField("rr4w7jfz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jqz6amyu",
    "name": "content",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9hybf21w91pglto")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rr4w7jfz",
    "name": "content",
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

  // remove
  collection.schema.removeField("jqz6amyu")

  return dao.saveCollection(collection)
})
