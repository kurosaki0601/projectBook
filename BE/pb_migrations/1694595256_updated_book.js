/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8by18wbee1qu8gu")

  // remove
  collection.schema.removeField("smdetlxw")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8by18wbee1qu8gu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "smdetlxw",
    "name": "category",
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
})
