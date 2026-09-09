const fs = require('fs');
const content = fs.readFileSync('src/components/admin/WpArticleEditor.tsx', 'utf8');

let stack = [];
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  let tags = line.match(/<\/?(?:div|details|summary)[\s>]/g) || [];
  
  for (let tag of tags) {
    // If it's a self-closing div like <div /> this is a bit harder to match just with regex, but usually we don't have <div />
    if (tag.startsWith('</')) {
      if (stack.length > 0) stack.pop();
    } else {
      let fullTagMatch = line.match(new RegExp(tag + '.*?/?>'));
      if (fullTagMatch && fullTagMatch[0].endsWith('/>')) {
         // self closing
      } else {
         stack.push(tag);
      }
    }
  }
}
console.log('Remaining on stack size:', stack.length);
