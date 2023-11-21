/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9hybf21w91pglto")

  collection.name = "blog"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9hybf21w91pglto")

  collection.name = "Blog"

  return dao.saveCollection(collection)
})
