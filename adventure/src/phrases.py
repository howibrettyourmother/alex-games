# Build the spoken-phrase bank for Doodle & Zoe: every speakable string literal in src/game, its sentences, and single words
# (fallback), keyed by normalized text. Output: phrases.tsv (id|text) + phr.json (norm->id). Clips: play/v/<id>.mp3 (lazy-loaded).
import re,os,json,hashlib
D=os.path.dirname(os.path.abspath(__file__))
def norm(s):
  s=s.replace('\u2019',"'").lower();s=re.sub(r"[^a-z0-9' ]+",' ',s);s=re.sub(r"(^| )'|'( |$)",' ',s);return ' '.join(s.split())
src=''.join(open(f'{D}/game/'+n).read() for n in sorted(os.listdir(f'{D}/game')) if n.endswith('.js'))
lits=[]
for m in re.finditer(r"'((?:[^'\\\n]|\\.)*)'|\"((?:[^\"\\\n]|\\.)*)\"|`([^`]*)`",src):
  s=m.group(1) if m.group(1) is not None else m.group(2) if m.group(2) is not None else m.group(3)
  s=s.replace("\\'","'").replace('\\"','"')
  for part in re.split(r'\$\{[^}]*\}',s): lits.append(part)
BAD=re.compile(r'[{}<>=;\\_#@|/*]|px|rgba?\(|^[a-z0-9]+$|^\s*$')
texts=[]
for s in lits:
  t0=re.sub(r"^v7:","",s);t=t0.strip()
  if not re.search('[A-Za-z]',t) or len(t)>220 or (BAD.search(t) and not (t0!=t and re.match(r'^[a-z]+$',t))): continue
  if not (re.search("[A-Z]",t) or " " in t0 or re.search(r'[!?.,]$',t)): continue
  texts.append(t)
  for sen in re.split(r'(?<=[!?.])\s+',t): texts.append(sen.strip())
words=set()
for t in texts: words.update(norm(t).split())
for w in sorted(words): texts.append(w)
# Animal sounds are NEVER spoken by Piper (it garbles them, e.g. 'meow' -> 'ni hao'): strip them; audio.js appends the real recording after the words.
ANI=r"meows?|mews?|purrs?|quacks?|woofs?|ribbits?|hoots?|hoo|oinks?|moos?|baa|neighs?"
def strip_ani(t):
  if not re.search(r"(?i)\b(?:"+ANI+r")\b",t): return t
  return re.sub(r"\s+([!?.,])",r"\1",re.sub(r"(?i)\b(?:"+ANI+r")\b[!?.,]*",' ',t)).strip(' ,')
bank={}
for t in texts:
  t=strip_ani(t);k=norm(t)
  if not k or k.isdigit() or k in bank: continue
  bank[k]=(hashlib.md5(k.encode()).hexdigest()[:10],t)
open(f'{D}/phrases.tsv','w').write(''.join(f'{i}|{t}\n' for k,(i,t) in bank.items()))
json.dump({k:i for k,(i,t) in bank.items()},open(f'{D}/phr.json','w'),separators=(',',':'))
print(len(bank),'phrases')
