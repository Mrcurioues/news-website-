const fs = require('fs');
const content = fs.readFileSync('src/components/admin/WpArticleEditor.tsx', 'utf8');

const regex = /<\/?([a-zA-Z0-9]+)(?:[^>]*?)(\/?)>/g;
let stack = [];
let match;
while ((match = regex.exec(content)) !== null) {
  let tag = match[1];
  let isClose = match[0].startsWith('</');
  let isSelfClose = match[2] === '/';
  
  if (tag === 'img' || tag === 'input' || tag === 'br' || tag === 'hr') continue;
  if (isSelfClose) continue;

  if (isClose) {
    if (stack.length === 0) {
      console.log(`Unmatched close tag ${tag} at index ${match.index}`);
    } else {
      let expected = stack.pop();
      if (tag !== expected) {
        console.log(`Mismatch at index ${match.index}: expected </${expected}>, got </${tag}>`);
      }
    }
  } else {
    stack.push(tag);
  }
}
console.log('Remaining on stack:', stack);
