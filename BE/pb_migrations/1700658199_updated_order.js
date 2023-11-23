/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wz4epi0vab0ftds")

  // remove
  collection.schema.removeField("pqrf3pf7")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wz4epi0vab0ftds")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pqrf3pf7",
    "name": "totalPrice",
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
