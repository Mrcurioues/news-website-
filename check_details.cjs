const fs = require('fs');
const content = fs.readFileSync('src/components/admin/WpArticleEditor.tsx', 'utf8');
const lines = content.split('\n');

let stack = [];
for(let i=530; i<=795; i++) {
  let line = lines[i];
  let tags = line.match(/<\/?([a-zA-Z0-9]+)/g) || [];
  for (let tag of tags) {
    if (tag === 'img' || tag === 'input' || tag === 'br' || tag === 'hr') continue;
    if (tag.startsWith('</')) {
      let t = tag.replace('</', '');
      let exp = stack.pop();
      if (t !== exp) console.log(`Mismatch on line ${i+1}: expected ${exp}, got ${t}`);
    } else {
      let t = tag.replace('<', '');
      if(t !== 'img' && t !== 'input' && t !== 'br' && t !== 'hr') stack.push(t);
    }
  }
}
