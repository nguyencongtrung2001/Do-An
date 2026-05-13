const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/(import|export)\s+(.*?)\s+from\s+['"](.*?)(\.js)['"]/g, "$1 $2 from '$3'");
    
    // Also handle dynamic imports or require if any
    newContent = newContent.replace(/import\(['"](.*?)(\.js)['"]\)/g, "import('$1')");
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated imports in ${filePath}`);
    }
  }
});

// Also update app.ts and server.ts specifically if needed
console.log("Xong! Đã xóa toàn bộ đuôi .js trong các câu lệnh import.");
