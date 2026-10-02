package dz.matba5.app

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.view.View
import java.io.BufferedReader
import java.io.InputStreamReader

class MainActivity : Activity() {
    private lateinit var web: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        web = WebView(this)
        web.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        web.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                injectAsset("v5_upgrades.js")
                injectAsset("world_cuisine_v6.js")
            }
        }
        web.webChromeClient = WebChromeClient()
        web.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            allowFileAccess = true
            allowContentAccess = true
            mediaPlaybackRequiresUserGesture = true
            loadsImagesAutomatically = true
            blockNetworkImage = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
        }
        web.addJavascriptInterface(MatbakBridge(this, this), "Matbak")
        web.loadUrl("file:///android_asset/index_v4.html")
        setContentView(web)
    }

    private fun injectAsset(name: String) {
        try {
            val text = assets.open(name).use { input ->
                BufferedReader(InputStreamReader(input, Charsets.UTF_8)).readText()
            }
            web.evaluateJavascript(text, null)
        } catch (_: Exception) {
            // Optional enhancement layer; the base app remains usable if it cannot be injected.
        }
    }

    @Deprecated("Deprecated in Android API 33")
    override fun onBackPressed() {
        if (web.canGoBack()) web.goBack() else super.onBackPressed()
    }
}
