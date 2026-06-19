const fs = require('fs');
const path = require('path');

// Try to load typescript from backend node_modules
let ts;
try {
    ts = require(path.join(__dirname, 'backend', 'node_modules', 'typescript'));
} catch (e) {
    console.error("TypeScript not found in backend/node_modules");
    process.exit(1);
}

function removeCommentsSafe(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.JSX, content);
    
    let out = '';
    let lastPos = 0;

    while (true) {
        const token = scanner.scan();
        if (token === ts.SyntaxKind.EndOfFileToken) {
            out += content.substring(lastPos, scanner.getTextPos());
            break;
        }

        if (token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia) {
            const commentStart = scanner.getTokenPos();
            const commentEnd = scanner.getTextPos();
            const commentText = content.substring(commentStart, commentEnd);

            // Keep pragmas and important directives
            if (/@ts-|eslint-|biome-|prettier-|# sourceMappingURL|@ts-ignore|@ts-expect-error/.test(commentText)) {
                continue; // keep it
            } else {
                // Add everything before the comment
                out += content.substring(lastPos, commentStart);
                lastPos = commentEnd; // Skip the comment text
            }
        }
    }

    if (content !== out) {
        fs.writeFileSync(filePath, out, 'utf8');
        console.log(`Stripped: ${filePath}`);
    }
}

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (['node_modules', 'dist', 'build', '.next', '.git', '.qoder'].includes(file)) continue;
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
            removeCommentsSafe(fullPath);
        }
    }
}

processDirectory(path.join(__dirname, 'backend'));
console.log('Done!');
