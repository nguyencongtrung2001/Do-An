const fs = require('fs');
const glob = require('glob');
const strip = require('strip-comments');

const files = glob.sync('src/**/*.{ts,js}', { ignore: ['**/node_modules/**', '**/dist/**', 'src/generated/**'] });

files.forEach(file => {
    try {
        const code = fs.readFileSync(file, 'utf8');
        
        
        const stripped = strip(code);
        
        if (code !== stripped) {
            fs.writeFileSync(file, stripped, 'utf8');
            console.log(`Stripped: ${file}`);
        }
    } catch (e) {
        console.error(`Error stripping ${file}:`, e);
    }
});

const rootFiles = glob.sync('*.{ts,js}', { ignore: ['**/node_modules/**', '**/dist/**', 'strip_comments.js'] });
rootFiles.forEach(file => {
    try {
        const code = fs.readFileSync(file, 'utf8');
        const stripped = strip(code);
        if (code !== stripped) {
            fs.writeFileSync(file, stripped, 'utf8');
            console.log(`Stripped: ${file}`);
        }
    } catch (e) {
        console.error(`Error stripping ${file}:`, e);
    }
});

console.log('Done!');
