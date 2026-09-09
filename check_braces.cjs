const fs = require('fs');
const content = fs.readFileSync('src/components/admin/WpArticleEditor.tsx', 'utf8');

let o = 0, c = 0;
for (let char of content) {
  if (char === '{') o++;
  if (char === '}') c++;
}
console.log('Open:', o, 'Close:', c);
