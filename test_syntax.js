const path = require('path');
const ts = require(path.join(__dirname, 'backend', 'node_modules', 'typescript'));

for (const key in ts.SyntaxKind) {
    if (ts.SyntaxKind[key] === 15) {
        console.log(`Kind 15 is ${key}`);
    }
}
