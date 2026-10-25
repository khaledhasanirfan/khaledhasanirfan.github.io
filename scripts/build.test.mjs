import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,cp,writeFile,readFile,rm,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
test('Publishing essays and photo stories preserves drafts, escapes prose, builds feeds, and removes withdrawn pages',async()=>{
 const temp=await mkdtemp(join(tmpdir(),'portfolio-test-'));
 try{
  for(const dir of ['content','scripts','docs'])await cp(join(root,dir),join(temp,dir),{recursive:true});
  const essay={slug:'evaluation-notes',title:'Evaluation & evidence',date:'2026-10-25',category:'Research notes',summary:'A fixture for the publishing pipeline.',status:'published',file:'evaluation.md'};
  const draft={...essay,slug:'private-draft',title:'PRIVATE DRAFT',status:'draft'};
  const story={slug:'a-photo-story',title:'A photo story',date:'2026-10-24',category:'Travel journal',summary:'A fixture album.',status:'published',file:'story.md',cover:'assets/images/portrait.webp',coverAlt:'A portrait by the sea',gallery:[{src:'assets/images/light-canvas.webp',alt:'Application screens',caption:'An authentic screenshot.'}]};
  await writeFile(join(temp,'content/writing.json'),JSON.stringify([essay,draft]));await writeFile(join(temp,'content/life.json'),JSON.stringify([story]));
  await writeFile(join(temp,'content/writing/evaluation.md'),'## A clear heading\n\nText with **evidence**, a [paper](https://example.org), and <script>alert(1)</script>.\n\n- First point\n- Second point\n\n```js\nconst evidence = true;\n```');
  await writeFile(join(temp,'content/life/story.md'),'## A moment\n\nA real story would go here.');
  const build=()=>execFileSync(process.execPath,['scripts/build.mjs'],{cwd:temp,stdio:'pipe'});build();
  const article=await readFile(join(temp,'docs/writing/evaluation-notes.html'),'utf8');
  assert.match(article,/<h2>A clear heading<\/h2>/);assert.match(article,/<strong>evidence<\/strong>/);assert.match(article,/&lt;script&gt;alert/);assert.doesNotMatch(article,/<script>alert/);assert.match(article,/\.\.\/assets\/style.css/);assert.match(article,/1 min read/);
  const index=await readFile(join(temp,'docs/writing.html'),'utf8');assert.match(index,/evaluation-notes.html/);assert.doesNotMatch(index,/PRIVATE DRAFT/);
  await assert.rejects(access(join(temp,'docs/writing/private-draft.html')));
  assert.match(await readFile(join(temp,'docs/writing.xml'),'utf8'),/Evaluation &amp; evidence/);
  assert.doesNotMatch(await readFile(join(temp,'docs/sitemap.xml'),'utf8'),/private-draft/);
  assert.match(await readFile(join(temp,'docs/life/a-photo-story.html'),'utf8'),/data-lightbox/);
  execFileSync('python3',['scripts/check.py'],{cwd:temp});
  await writeFile(join(temp,'content/writing.json'),'[]');build();await assert.rejects(access(join(temp,'docs/writing/evaluation-notes.html')));
  await writeFile(join(temp,'content/writing.json'),JSON.stringify([{...essay,file:'../profile.json'}]));assert.throws(build,/Content path must stay/);
 }finally{await rm(temp,{recursive:true,force:true});}
});
