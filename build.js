var fs = require('fs');
var path = require('path');

var src = path.join(__dirname, 'src', 'star-rating-svg.js');
var dist = path.join(__dirname, 'dist', 'star-rating-svg.js');
var distDir = path.dirname(dist);

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.copyFileSync(src, dist);
console.log('Copied to dist/star-rating-svg.js');
