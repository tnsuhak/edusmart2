import fs from 'node:fs';
import path from 'node:path';
const templates=Object.fromEntries(['nav','contact','footer'].map(k=>[k,fs.readFileSync(`templates/${k}.html`,'utf8')]));
const preview=process.env.CONTEXT && process.env.CONTEXT!=='production';
fs.rmSync('dist',{recursive:true,force:true});
fs.mkdirSync('dist',{recursive:true});
for(const name of fs.readdirSync('.')){
 if(/\.(html|css|js|svg|xml|txt)$/.test(name) && name!=='build.mjs'){
  let text=fs.readFileSync(name,'utf8');
  if(name.endsWith('.html')){
   text=text.replace(/<nav class="gnav">[\s\S]*?<\/nav>/,templates.nav)
    .replace(/<section[^>]*>\s*<span class="section-label">CONTACT<\/span>[\s\S]*?<\/section>/,templates.contact)
    .replace(/<footer>[\s\S]*?<\/footer>/,templates.footer);
   text=text.replace(/ aria-current="page"/g,'');
   text=text.replace(/<a ([^>]*href="([^"]+)"[^>]*)>/g,(all,attrs,href)=>href===name?`<a ${attrs} aria-current="page">`:all);
   fs.writeFileSync(name,text);
   if(preview) text=text.replace(/name="robots" content="index,follow"|content="index,follow" name="robots"/g,'name="robots" content="noindex,nofollow"');
  }
  fs.writeFileSync(path.join('dist',name),text);
 }
}
fs.cpSync('images','dist/images',{recursive:true});
if(preview){fs.writeFileSync('dist/_headers','/*\n  X-Robots-Tag: noindex, nofollow\n');fs.writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\n');}
console.log(`Static build complete (${preview?'preview: noindex':'production: indexable'})`);
