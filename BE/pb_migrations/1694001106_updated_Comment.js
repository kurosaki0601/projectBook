/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("opq9wklxj4ott9p")

  collection.name = "comment"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("opq9wklxj4ott9p")

  collection.name = "Comment"

  return dao.saveCollection(collection)
})
