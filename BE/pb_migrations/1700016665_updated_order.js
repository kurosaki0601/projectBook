/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wz4epi0vab0ftds")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5wlnycgf",
    "name": "quantityOrder",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wz4epi0vab0ftds")

  // remove
  collection.schema.removeField("5wlnycgf")

  return dao.saveCollection(collection)
})
