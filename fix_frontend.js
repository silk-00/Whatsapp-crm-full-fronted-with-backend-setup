const fs = require('fs');
const path = require('path');

function fixFrontendUrls() {
  const jsFilePath = path.join(__dirname, 'client', 'public', 'static', 'js', 'main.e694f0ef.js');

  try {
    // Read the JavaScript file
    let jsContent = fs.readFileSync(jsFilePath, 'utf8');

    console.log('Original file size:', jsContent.length);

    // More comprehensive replacements
    const replacements = [
      // HTTPS variations
      { from: /https:\/\/yourdomain\.com/g, to: 'http://localhost:8001' },
      { from: /https:\/\/your-domain\.com/g, to: 'http://localhost:8001' },

      // HTTP variations
      { from: /http:\/\/yourdomain\.com/g, to: 'http://localhost:8001' },
      { from: /http:\/\/your-domain\.com/g, to: 'http://localhost:8001' },

      // Domain only variations
      { from: /yourdomain\.com/g, to: 'localhost:8001' },
      { from: /your-domain\.com/g, to: 'localhost:8001' },

      // Quoted variations
      { from: /"yourdomain\.com"/g, to: '"localhost:8001"' },
      { from: /"your-domain\.com"/g, to: '"localhost:8001"' },

      // API path variations
      { from: /yourdomain\.com\/api/g, to: 'localhost:8001/api' },
      { from: /your-domain\.com\/api/g, to: 'localhost:8001/api' },

      // Base URL patterns
      { from: /baseURL:\s*["']https:\/\/yourdomain\.com["']/g, to: 'baseURL: "http://localhost:8001"' },
      { from: /baseURL:\s*["']https:\/\/your-domain\.com["']/g, to: 'baseURL: "http://localhost:8001"' },

      // API endpoint patterns
      { from: /["']https:\/\/yourdomain\.com\/api/g, to: '"http://localhost:8001/api' },
      { from: /["']https:\/\/your-domain\.com\/api/g, to: '"http://localhost:8001/api' }
    ];

    let changesMade = 0;

    replacements.forEach((replacement, index) => {
      const beforeContent = jsContent;
      jsContent = jsContent.replace(replacement.from, replacement.to);

      if (beforeContent !== jsContent) {
        changesMade++;
        console.log(`✓ Applied replacement pattern ${index + 1}`);
      }
    });

    if (changesMade > 0) {
      // Create backup if it doesn't exist
      const backupPath = jsFilePath + '.backup';
      if (!fs.existsSync(backupPath)) {
        fs.writeFileSync(backupPath, fs.readFileSync(jsFilePath));
        console.log('✓ Created backup of original file');
      }

      // Write modified content
      fs.writeFileSync(jsFilePath, jsContent);
      console.log(`✓ Applied ${changesMade} URL replacements`);
      console.log('✓ Frontend URLs have been fixed!');
    } else {
      console.log('⚠ No hardcoded URLs found to replace');
    }

  } catch (error) {
    console.error('❌ Error fixing frontend URLs:', error.message);
  }
}

// Run the fix
fixFrontendUrls();
