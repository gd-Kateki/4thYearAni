const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../public');
for (const name of ['index.html','styles.css','app.js','content.js']) assert.ok(fs.statSync(path.join(root,name)).size, `${name} is missing or empty`);
for (const name of ['app.js','content.js']) new vm.Script(fs.readFileSync(path.join(root,name),'utf8'),{filename:name});
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),context);
const c=context.window.ANNIVERSARY;
assert.equal(typeof c.letter,'string');assert.ok(c.letter.trim());
for (const key of ['timeline','littleThings','future']) assert.ok(Array.isArray(c[key]) && c[key].length, `${key} must contain content`);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const url=match[1];if (/^(?:data:|https?:|#)/.test(url)) continue;
  assert.ok(!url.startsWith('/'), `Use a relative asset path for GitHub project sites: ${url}`);
  assert.ok(fs.existsSync(path.join(root,url)),`Missing local asset: ${url}`);
}
console.log('PASS: site files, JavaScript syntax, editable content, and relative asset links.');
