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
                injectPremiumUpgrade()
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
        web.loadUrl("file:///android_asset/index_v4.html")
        setContentView(web)
    }

    private fun injectPremiumUpgrade() {
        try {
            val text = assets.open("v5_upgrades.js").use { input ->
                BufferedReader(InputStreamReader(input, Charsets.UTF_8)).readText()
            }
            web.evaluateJavascript(text, null)
        } catch (_: Exception) {
            // Optional visual layer; the core app remains usable if injection fails.
        }
    }

    @Deprecated("Deprecated in Android API 33")
    override fun onBackPressed() {
        if (web.canGoBack()) web.goBack() else super.onBackPressed()
    }
}
