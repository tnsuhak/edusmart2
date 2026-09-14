import fs from 'node:fs';
import path from 'node:path';
const templates=Object.fromEntries(['nav','contact','footer'].map(k=>[k,fs.readFileSync(`templates/${k}.html`,'utf8')]));
const pricing=JSON.parse(fs.readFileSync('pricing-latest.json','utf8'));
const preview=process.env.CONTEXT && process.env.CONTEXT!=='production';

const northPrivate=pricing.north_vancouver_private;
const oldNorthPrivate=Number(northPrivate.previous_cad);
const newNorthPrivate=Number(northPrivate.cad);
const publicNorth=Number(northPrivate.public_program_cad_for_comparison);
const oldNorthPrivateFmt=oldNorthPrivate.toLocaleString('en-US');
const newNorthPrivateFmt=newNorthPrivate.toLocaleString('en-US');
const oldKrwMan=Math.round(oldNorthPrivate/10).toLocaleString('en-US');
const newKrwMan=Math.round(newNorthPrivate/10).toLocaleString('en-US');
const oldPublicGap=(oldNorthPrivate-publicNorth).toLocaleString('en-US');
const newPublicGap=(newNorthPrivate-publicNorth).toLocaleString('en-US');
const northPrivatePriceFiles=new Set([
 'index.html',
 'supervised.html',
 'north-vancouver-public.html',
 'north-vancouver-private.html',
 'nav-core.js'
]);
const northPrivateUpdatedPages=new Set([
 'supervised.html',
 'north-vancouver-public.html',
 'north-vancouver-private.html'
]);

fs.rmSync('dist',{recursive:true,force:true});
fs.mkdirSync('dist',{recursive:true});
for(const name of fs.readdirSync('.')){
 if(/\.(html|css|js|svg|xml|txt)$/.test(name) && name!=='build.mjs'){
  let text=fs.readFileSync(name,'utf8');

  // Latest verified EduSmart fee revision received 2026-09-13.
  // Old and new PDFs differ only in the North Vancouver private programme fee.
  if(northPrivatePriceFiles.has(name)){
   text=text.replaceAll(oldNorthPrivateFmt,newNorthPrivateFmt)
    .replaceAll(String(oldNorthPrivate),String(newNorthPrivate))
    .replaceAll(oldKrwMan,newKrwMan)
    .replaceAll(oldPublicGap,newPublicGap);
  }
  if(northPrivateUpdatedPages.has(name)){
   text=text.replaceAll('정보 업데이트 2026.09.08','정보 업데이트 2026.09.14')
    .replaceAll('"dateModified":"2026-09-08"','"dateModified":"2026-09-14"')
    .replaceAll('"dateModified": "2026-09-08"','"dateModified": "2026-09-14"');
  }

  if(name.endsWith('.html')){
   text=text.replace(/<nav class="gnav">[\s\S]*?<\/nav>/,templates.nav)
    .replace(/<section[^>]*>\s*<span class="section-label">CONTACT<\/span>[\s\S]*?<\/section>/,templates.contact)
    .replace(/<footer>[\s\S]*?<\/footer>/,templates.footer);
   text=text.replace(/ aria-current="page"/g,'');
   text=text.replace(/<a ([^>]*href="([^"]+)"[^>]*)>/g,(all,attrs,href)=>href===name?`<a ${attrs} aria-current="page">`:all);
   if(name==='student-life-videos.html'){
    text=text.replace(/<a class="video-original"[^>]*>[\s\S]*?<\/a>/g,'')
     .replace(/<h1>실제 학생들의<br\/><span>생활 영상 보기<\/span><\/h1>/,'<h1>실제 학생 생활<br/><span>영상 모음</span></h1>');
   }
   fs.writeFileSync(name,text);
   if(preview) text=text.replace(/name="robots" content="index,follow"|content="index,follow" name="robots"/g,'name="robots" content="noindex,nofollow"');
  }
  fs.writeFileSync(path.join('dist',name),text);
 }
}
fs.cpSync('images','dist/images',{recursive:true});
if(preview){fs.writeFileSync('dist/_headers','/*\n  X-Robots-Tag: noindex, nofollow\n');fs.writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\n');}
console.log(`Static build complete (${preview?'preview: noindex':'production: indexable'})`);
