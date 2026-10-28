import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {dirname,resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const directory=resolve(dirname(fileURLToPath(import.meta.url)),'../docs');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.pdf':'application/pdf','.woff2':'font/woff2','.ttf':'font/ttf','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
 try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=resolve(directory,'.'+pathname);if(file!==directory&&!file.startsWith(directory+'/')){res.writeHead(403);res.end();return;}if((await stat(file)).isDirectory())file=resolve(file,'index.html');const data=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);}
 catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(directory,'404.html')));}
}).listen(port,'127.0.0.1',()=>console.log('Portfolio preview: http://127.0.0.1:'+port));
