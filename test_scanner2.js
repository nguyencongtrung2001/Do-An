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
    const tokenText = content.substring(scanner.getTokenPos(), scanner.getTextPos());
    if (tokenText.includes('Lưu lịch sử')) {
        console.log(`Token containing text: Kind = ${token}`);
    }
}
