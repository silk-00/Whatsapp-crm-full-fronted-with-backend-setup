const fs = require('fs');
const path = require('path');

function injectRuntimeConfig() {
  const indexPath = path.join(__dirname, 'client', 'public', 'index.html');
  
  try {
    let htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    // Configuration script to override any hardcoded URLs
    const configScript = `
<script>
// Runtime configuration to override hardcoded URLs
window.APP_CONFIG = {
  API_BASE_URL: 'http://localhost:8001',
  FRONTEND_URL: 'http://localhost:8001'
};

// Override fetch to redirect API calls to local server
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  // Convert URL to string if it's a URL object
  const urlString = url.toString();
  
  // Check if it's trying to call the old domain
  if (urlString.includes('yourdomain.com') || urlString.includes('your-domain.com')) {
    // Replace with local server
    const newUrl = urlString
      .replace(/https?:\\/\\/yourdomain\\.com/g, 'http://localhost:8001')
      .replace(/https?:\\/\\/your-domain\\.com/g, 'http://localhost:8001')
      .replace(/yourdomain\\.com/g, 'localhost:8001')
      .replace(/your-domain\\.com/g, 'localhost:8001');
    
    console.log('Redirecting API call from:', urlString, 'to:', newUrl);
    return originalFetch(newUrl, options);
  }
  
  return originalFetch(url, options);
};

// Override XMLHttpRequest for older AJAX calls
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...args) {
  const urlString = url.toString();
  
  if (urlString.includes('yourdomain.com') || urlString.includes('your-domain.com')) {
    const newUrl = urlString
      .replace(/https?:\\/\\/yourdomain\\.com/g, 'http://localhost:8001')
      .replace(/https?:\\/\\/your-domain\\.com/g, 'http://localhost:8001')
      .replace(/yourdomain\\.com/g, 'localhost:8001')
      .replace(/your-domain\\.com/g, 'localhost:8001');
    
    console.log('Redirecting XHR call from:', urlString, 'to:', newUrl);
    return originalXHROpen.call(this, method, newUrl, ...args);
  }
  
  return originalXHROpen.call(this, method, url, ...args);
};
</script>`;

    // Check if config script is already injected
    if (htmlContent.includes('window.APP_CONFIG')) {
      console.log('⚠ Configuration script already injected');
      return;
    }

    // Inject the script before the closing head tag
    htmlContent = htmlContent.replace('</head>', configScript + '\n</head>');
    
    // Write the modified HTML
    fs.writeFileSync(indexPath, htmlContent);
    console.log('✓ Runtime configuration injected into index.html');
    
  } catch (error) {
    console.error('❌ Error injecting configuration:', error.message);
  }
}

// Run the injection
injectRuntimeConfig();
