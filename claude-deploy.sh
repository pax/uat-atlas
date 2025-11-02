#!/bin/bash

# CityProfiler Deployment Script
# This script packages the application for deployment

echo "🚀 CityProfiler Deployment Script"
echo "================================="

# Check if cities.db exists
if [ ! -f "data/cities.db" ]; then
    echo "⚠️  Warning: cities.db not found in data/ directory"
    echo "   Make sure to place your database file before deployment"
fi

# Generate JSON files from database
if [ -f "data/cities.db" ]; then
    echo "📊 Generating JSON files from database..."
    python3 export_data.py
    if [ $? -eq 0 ]; then
        echo "✅ JSON files generated successfully"
    else
        echo "❌ Error generating JSON files"
        exit 1
    fi
else
    echo "⏭️  Skipping JSON generation (no database found)"
fi

# Create deployment directory
DEPLOY_DIR="cityprofiler-deploy"
echo "📁 Creating deployment package in $DEPLOY_DIR/"

# Clean up any existing deployment directory
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copy essential files
echo "📋 Copying files..."
cp index.html $DEPLOY_DIR/

# Prefer root-level assets, but fall back to prototypes/claude if they're not present
if [ -f "styles.css" ]; then
    cp styles.css $DEPLOY_DIR/
elif [ -f "prototypes/claude/styles.css" ]; then
    cp prototypes/claude/styles.css $DEPLOY_DIR/styles.css
else
    echo "⚠️  styles.css not found in root or prototypes/claude"
fi

if [ -f "app.js" ]; then
    cp app.js $DEPLOY_DIR/
elif [ -f "prototypes/claude/app.js" ]; then
    cp prototypes/claude/app.js $DEPLOY_DIR/app.js
else
    echo "⚠️  app.js not found in root or prototypes/claude"
fi

# Copy data directory (if exists)
if [ -d "data" ]; then
    cp -r data $DEPLOY_DIR/
else
    echo "⚠️  data/ directory not found; skipping"
fi

# Optional: Copy PHP backend
read -p "Include PHP backend? (y/n): " include_php
if [ "$include_php" = "y" ]; then
    cp api.php $DEPLOY_DIR/
    echo "✅ PHP backend included"
fi

# Optional: Minify JavaScript and CSS
read -p "Minify CSS and JavaScript? (requires npm) (y/n): " minify
if [ "$minify" = "y" ]; then
    # Check if npm is installed
    if command -v npm &> /dev/null; then
        echo "🔧 Installing minification tools..."
        npm install -g terser clean-css-cli --silent
        
        echo "🔧 Minifying files..."
        terser app.js -o $DEPLOY_DIR/app.min.js --compress --mangle
        cleancss -o $DEPLOY_DIR/styles.min.css styles.css
        
        # Update HTML to use minified versions
        sed -i 's/app.js/app.min.js/g' $DEPLOY_DIR/index.html
        sed -i 's/styles.css/styles.min.css/g' $DEPLOY_DIR/index.html
        
        # Remove non-minified versions
        rm $DEPLOY_DIR/app.js $DEPLOY_DIR/styles.css
        
        echo "✅ Files minified"
    else
        echo "⚠️  npm not found, skipping minification"
    fi
fi

# Create a simple server script for local testing
cat > $DEPLOY_DIR/serve.py << 'EOF'
#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8000
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map['.js'] = 'application/javascript'

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🌐 Server running at http://localhost:{PORT}/")
    print("Press Ctrl+C to stop")
    httpd.serve_forever()
EOF

chmod +x $DEPLOY_DIR/serve.py

# Create deployment instructions
cat > $DEPLOY_DIR/DEPLOY.txt << 'EOF'
CityProfiler Deployment Instructions
====================================

QUICK START:
1. Test locally: Run `python3 serve.py` and open http://localhost:8000
2. Deploy to web: Upload all files to your web server

STATIC HOSTING (GitHub Pages, Netlify, Vercel):
- Simply upload/push all files in this directory
- No server configuration needed

SHARED HOSTING (with PHP):
- Upload all files via FTP
- If using api.php, ensure PHP 7.4+ with SQLite support

UPDATING DATA:
1. Update data/cities.db with new data
2. Run: python3 export_data.py
3. Upload new JSON files in data/ directory

SUPPORT:
See README.md for detailed documentation
EOF

# Calculate deployment size
SIZE=$(du -sh $DEPLOY_DIR | cut -f1)

echo ""
echo "✅ Deployment package created successfully!"
echo "📦 Package size: $SIZE"
echo "📍 Location: $DEPLOY_DIR/"
echo ""
echo "Next steps:"
echo "1. cd $DEPLOY_DIR"
echo "2. python3 serve.py  (to test locally)"
echo "3. Deploy to your hosting provider"
echo ""
echo "Happy deploying! 🚀"
