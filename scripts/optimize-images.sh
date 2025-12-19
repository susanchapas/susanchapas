#!/bin/bash

# Image Optimization Script for Portfolio
# Converts JPG/HEIC to optimized WebP format
# Requires: cwebp (install via: brew install webp)

set -e

GALLERY_DIR="public/gallery"
PROJECTS_DIR="public/assets/projects"

echo "🖼️  Optimizing images for web performance..."

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "cwebp not found. Installing via Homebrew..."
    brew install webp
fi

# Function to optimize and convert images
optimize_image() {
    local input="$1"
    local output="${input%.*}.webp"
    
    # Skip if already webp or if optimized version exists
    if [[ "$input" == *.webp ]]; then
        echo "  ⏭️  Skipping (already WebP): $input"
        return
    fi
    
    if [[ -f "$output" ]]; then
        echo "  ⏭️  Skipping (WebP exists): $input"
        return
    fi
    
    echo "  🔄 Converting: $input -> $output"
    
    # Convert to WebP with quality 80 (good balance of quality/size)
    cwebp -q 80 -m 6 -resize 1920 0 "$input" -o "$output" 2>/dev/null
    
    # Get file sizes
    original_size=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input" 2>/dev/null)
    new_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
    
    # Calculate savings
    savings=$((original_size - new_size))
    savings_pct=$((savings * 100 / original_size))
    
    echo "  ✅ Saved: $(numfmt --to=iec $savings 2>/dev/null || echo "${savings} bytes") (${savings_pct}%)"
}

# Process gallery images
echo ""
echo "📁 Processing gallery images..."
for file in "$GALLERY_DIR"/*.jpg "$GALLERY_DIR"/*.jpeg "$GALLERY_DIR"/*.JPG "$GALLERY_DIR"/*.JPEG; do
    [[ -f "$file" ]] && optimize_image "$file"
done

# Process project images
echo ""
echo "📁 Processing project images..."
for file in "$PROJECTS_DIR"/*.jpg "$PROJECTS_DIR"/*.jpeg "$PROJECTS_DIR"/*.JPG "$PROJECTS_DIR"/*.JPEG; do
    [[ -f "$file" ]] && optimize_image "$file"
done

echo ""
echo "✨ Image optimization complete!"
echo ""
echo "📊 Summary of WebP files:"
find public -name "*.webp" -exec ls -lh {} \; | awk '{print "  " $9 ": " $5}'

echo ""
echo "💡 Next steps:"
echo "  1. Update image references in code to use .webp files"
echo "  2. Consider removing original JPG files to save space"
echo "  3. Run 'npm run build' to rebuild with optimized images"
