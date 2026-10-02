package dz.matba5.app

import android.content.Context
import android.content.Intent
import android.view.WindowManager
import android.webkit.JavascriptInterface
import org.json.JSONArray

class MatbakBridge(private val context: Context, private val activity: MainActivity) {
    private val db = RecipeDbHelper(context)
    private val prefs = context.getSharedPreferences("matbak_prefs", Context.MODE_PRIVATE)

    @JavascriptInterface fun getLanguage(): String = prefs.getString("language", "") ?: ""
    @JavascriptInterface fun setLanguage(language: String) { prefs.edit().putString("language", language).apply() }
    @JavascriptInterface fun saveRecipe(json: String, favorite: Boolean) { db.saveRecipe(json, favorite) }
    @JavascriptInterface fun setFavorite(id: String, favorite: Boolean) { db.setFavorite(id, favorite) }
    @JavascriptInterface fun getFavorites(): String = db.favorites().toString()
    @JavascriptInterface fun getRecent(): String = db.recent().toString()
    @JavascriptInterface fun addShopping(json: String) { db.addShopping(JSONArray(json)) }
    @JavascriptInterface fun getShopping(): String = db.shopping().toString()
    @JavascriptInterface fun toggleShopping(id: Long, checked: Boolean) { db.toggleShopping(id, checked) }
    @JavascriptInterface fun setKeepScreenOn(enabled: Boolean) {
        if (enabled) activity.window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        else activity.window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    }
    @JavascriptInterface fun shareShoppingList(text: String) {
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(Intent.EXTRA_TEXT, text)
            setPackage("com.whatsapp")
        }
        try { context.startActivity(intent) } catch (_: Exception) {
            context.startActivity(Intent.createChooser(Intent(Intent.ACTION_SEND).apply {
                type = "text/plain"
                putExtra(Intent.EXTRA_TEXT, text)
            }, context.getString(R.string.share_shopping_list)))
        }
    }
}
