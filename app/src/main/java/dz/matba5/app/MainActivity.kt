package dz.matba5.app

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.WebSettings
import android.view.ViewGroup

class MainActivity : Activity() {
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val web = WebView(this)
        web.layoutParams = ViewGroup.LayoutParams(-1, -1)
        web.webViewClient = WebViewClient()
        web.settings.javaScriptEnabled = true
        web.settings.domStorageEnabled = true
        web.settings.cacheMode = WebSettings.LOAD_DEFAULT
        web.settings.allowFileAccess = true
        web.loadUrl("file:///android_asset/index.html")
        setContentView(web)
    }
    override fun onBackPressed() { val w = (window.decorView.findViewById<WebView>(android.R.id.content)); super.onBackPressed() }
}
