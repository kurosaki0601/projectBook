/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qsnjsj9yvrxyazr");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "qsnjsj9yvrxyazr",
    "created": "2023-11-06 15:06:09.528Z",
    "updated": "2023-11-06 15:06:09.528Z",
    "name": "orderBooks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uybiqb1l",
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
      },
      {
        "system": false,
        "id": "wf8j3kvq",
        "name": "number",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
