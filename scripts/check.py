"""Check the generated site without third-party dependencies or network access."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, sys, xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
DOCS=ROOT/'docs'
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.ids=[];self.refs=[];self.images=[];self.h1=0;self.title=False;self.description=False;self.canonical=False;self.main=False;self.lang=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag in ['a','link','use'] and 'href' in a:self.refs.append(a['href'])
  if tag in ['img','script'] and 'src' in a:self.refs.append(a['src'])
  if tag=='img':self.images.append(a)
  if tag=='h1':self.h1+=1
  if tag=='title':self.title=True
  if tag=='meta' and a.get('name')=='description':self.description=bool(a.get('content'))
  if tag=='link' and a.get('rel')=='canonical':self.canonical=True
  if tag=='main':self.main=True
  if tag=='html':self.lang=a.get('lang')=='en'
pages={}
errors=[]
for path in DOCS.rglob('*.html'):
 p=Page();p.feed(path.read_text());pages[path.resolve()]=p
 for ok,message in [(p.h1==1,'exactly one h1'),(p.title,'title'),(p.description,'meta description'),(p.canonical,'canonical URL'),(p.main,'main landmark'),(p.lang,'language'),(len(p.ids)==len(set(p.ids)),'unique IDs')]:
  if not ok:errors.append(f'{path.name}: missing/invalid {message}')
 for im in p.images:
  if not im.get('alt'):errors.append(f'{path.name}: missing descriptive image alt')
for path,p in pages.items():
 for ref in p.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  target=(DOCS/unquote(u.path).lstrip('/') if u.path.startswith('/') else path.parent/unquote(u.path)).resolve() if u.path else path
  if target.is_dir():target=target/'index.html'
  if not target.exists():errors.append(f'{path.relative_to(DOCS)}: broken reference {ref}')
  elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:errors.append(f'{path.name}: missing anchor {ref}')
# CSS references must resolve too, including every self-hosted font.
import re
for css in DOCS.rglob('*.css'):
 for ref in re.findall(r'url\([\"\']?([^\)\"\']+)',css.read_text()):
  if not urlsplit(ref).scheme and not (css.parent/ref).resolve().exists():errors.append(f'{css.name}: missing CSS asset {ref}')

for path in DOCS.glob('*.xml'):
 try:ET.parse(path)
 except ET.ParseError as e:errors.append(f'{path.name}: invalid XML {e}')
pubs=json.loads((ROOT/'content/publications.json').read_text())
if len({p['doi'].lower() for p in pubs})!=len(pubs):errors.append('Duplicate publication DOIs')
cv=(DOCS/'assets/files/khaled-hasan-cv.pdf').read_bytes()
if not cv.startswith(b'%PDF') or len(cv)<10000:errors.append('CV is not a substantive PDF')
# WCAG relative luminance check for the core text colors on their backgrounds.
def lum(c):
 rgb=[int(c[i:i+2],16)/255 for i in (1,3,5)];rgb=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in rgb];return sum(a*b for a,b in zip(rgb,[.2126,.7152,.0722]))
for fg,bg in [('#e8eef4','#10151c'),('#a6b2c2','#10151c'),('#8bb9f4','#10151c'),('#83c7c0','#10151c'),('#10151c','#c5f345'),('#10151c','#d5ff6b'),('#bba7ff','#10151c'),('#f2f3f0','#10151c'),('#c0c7d1','#10151c'),('#c5f345','#222c18'),('#92d4ca','#10151c'),('#d6bd88','#10151c'),('#8299b1','#10151c')]:
 a,b=sorted([lum(fg),lum(bg)]);ratio=(b+.05)/(a+.05)
 if ratio<4.5:errors.append(f'Core color contrast below AA: {fg}/{bg} {ratio:.2f}')
if errors:print('\n'.join(errors));sys.exit(1)
print(f'PASS: {len(pages)} HTML pages; local links and anchors, metadata, landmarks, image alt text, XML feeds, DOI uniqueness, CV, and core AA color contrast.')
