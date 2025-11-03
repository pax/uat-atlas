#!/bin/bash

# Script to run HTMX version locally
# This demonstrates why HTMX requires a server

echo "🚀 CityProfiler HTMX Version Test Server"
echo "========================================"
echo ""
echo "⚠️  IMPORTANT: HTMX requires a PHP server to work!"
echo ""

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. HTMX version cannot run without it."
    echo "   This is the main limitation of HTMX for your project!"
    echo ""
    echo "To install PHP:"
    echo "   Ubuntu/Debian: sudo apt install php"
    echo "   Mac: brew install php"
    echo "   Windows: Download from php.net"
    exit 1
fi

echo "✅ PHP found: $(php -v | head -n 1)"
echo ""

# Check if data files exist
if [ ! -d "data" ]; then
    echo "❌ Data directory not found. Please run export_data.py first."
    exit 1
fi

echo "📁 Starting PHP development server..."
echo "📍 Server will run at: http://localhost:8080"
echo ""
echo "📝 HTMX Architecture:"
echo "   1. Every user interaction triggers an HTTP request"
echo "   2. PHP backend generates HTML fragments"
echo "   3. HTMX swaps the HTML in the DOM"
echo "   4. Server maintains session state"
echo ""
echo "⚠️  Problems you'll notice:"
echo "   - Search has network latency on every keystroke"
echo "   - Map still requires full JavaScript"
echo "   - Can't deploy to GitHub Pages or Netlify"
echo "   - Requires always-on PHP server ($$$)"
echo ""
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"

# Start PHP server
php -S localhost:8080
