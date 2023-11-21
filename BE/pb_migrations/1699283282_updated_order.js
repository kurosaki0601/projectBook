/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wz4epi0vab0ftds")

  // remove
  collection.schema.removeField("zdt0l1z5")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wz4epi0vab0ftds")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zdt0l1z5",
    "name": "totalPrice",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
