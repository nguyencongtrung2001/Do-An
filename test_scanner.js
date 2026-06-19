const fs = require('fs');
const path = require('path');
const ts = require(path.join(__dirname, 'backend', 'node_modules', 'typescript'));

const filePath = path.join(__dirname, 'backend/src/services/booking.service.ts');
const content = fs.readFileSync(filePath, 'utf8');
const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.JSX, content);

let count = 0;
while (true) {
    const token = scanner.scan();
    if (token === ts.SyntaxKind.EndOfFileToken) {
        break;
    }
    if (token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia) {
        const commentStart = scanner.getTokenPos();
        const commentEnd = scanner.getTextPos();
        const commentText = content.substring(commentStart, commentEnd);
        console.log(`Found comment: ${commentText}`);
        count++;
    }
}
console.log(`Total comments: ${count}`);
