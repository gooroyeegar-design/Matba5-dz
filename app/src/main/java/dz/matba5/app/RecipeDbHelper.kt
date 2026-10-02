package dz.matba5.app

import android.content.ContentValues
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import org.json.JSONArray
import org.json.JSONObject

class RecipeDbHelper(context: Context) : SQLiteOpenHelper(context, "matbak.db", null, 1) {
    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL("CREATE TABLE recipes(id TEXT PRIMARY KEY, json TEXT NOT NULL, favorite INTEGER NOT NULL DEFAULT 0, viewed_at INTEGER NOT NULL DEFAULT 0)")
        db.execSQL("CREATE TABLE shopping(id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT NOT NULL, checked INTEGER NOT NULL DEFAULT 0)")
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) = Unit

    fun saveRecipe(json: String, favorite: Boolean? = null) {
        val obj = JSONObject(json)
        val id = obj.getString("id")
        val values = ContentValues().apply {
            put("id", id)
            put("json", json)
            put("viewed_at", System.currentTimeMillis())
            if (favorite != null) put("favorite", if (favorite) 1 else 0)
        }
        writableDatabase.insertWithOnConflict("recipes", null, values, SQLiteDatabase.CONFLICT_REPLACE)
    }

    fun setFavorite(id: String, value: Boolean) {
        val values = ContentValues().apply { put("favorite", if (value) 1 else 0) }
        writableDatabase.update("recipes", values, "id=?", arrayOf(id))
    }

    fun favorites(): JSONArray = query("favorite=1", emptyArray(), "viewed_at DESC")
    fun recent(): JSONArray = query("viewed_at>0", emptyArray(), "viewed_at DESC")

    private fun query(selection: String, args: Array<String>, order: String): JSONArray {
        val out = JSONArray()
        readableDatabase.query("recipes", arrayOf("json"), selection, args, null, null, order, "50").use { c ->
            while (c.moveToNext()) out.put(JSONObject(c.getString(0)))
        }
        return out
    }

    fun addShopping(items: JSONArray) {
        val db = writableDatabase
        db.beginTransaction()
        try {
            for (i in 0 until items.length()) {
                val value = ContentValues().apply { put("item", items.optString(i)) }
                db.insert("shopping", null, value)
            }
            db.setTransactionSuccessful()
        } finally { db.endTransaction() }
    }

    fun shopping(): JSONArray {
        val out = JSONArray()
        readableDatabase.query("shopping", arrayOf("id","item","checked"), null, null, null, null, "id DESC").use { c ->
            while (c.moveToNext()) out.put(JSONObject().apply { put("id", c.getLong(0)); put("item", c.getString(1)); put("checked", c.getInt(2) == 1) })
        }
        return out
    }

    fun toggleShopping(id: Long, checked: Boolean) {
        writableDatabase.update("shopping", ContentValues().apply { put("checked", if (checked) 1 else 0) }, "id=?", arrayOf(id.toString()))
    }
}
