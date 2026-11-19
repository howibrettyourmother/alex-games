# Bundle everything into one self-contained index.html: voice clips (base64 mp3), silent-loop mp3, embedded font, audio engine, game modules.
import base64,json,os
D=os.path.dirname(os.path.abspath(__file__));A='/tmp/dz'
keys=[l.split('|')[0] for l in open(f'{D}/lines.txt').read().split('\n') if l.strip()]
os.makedirs(f'{D}/clips',exist_ok=True)
for k in keys+['silent']: os.system(f'cp -n {A}/{k}.mp3 {D}/clips/ 2>/dev/null')
clips={k:base64.b64encode(open(f'{D}/clips/{k}.mp3','rb').read()).decode() for k in keys}
silent=base64.b64encode(open(f'{D}/clips/silent.mp3','rb').read()).decode()
font=base64.b64encode(open(f'{D}/baloo.woff','rb').read()).decode()
game=''.join(open(f'{D}/game/'+n).read()+'\n' for n in sorted(os.listdir(f'{D}/game')) if n.endswith('.js'))
phr=open(f'{D}/phr.json').read()
js='const PHR='+phr+';\nconst CLIPS='+json.dumps(clips,separators=(',',':'))+';\nconst SILENT_MP3="data:audio/mpeg;base64,'+silent+'";\n'+open(f'{D}/audio.js').read()+'\n'+"(document.fonts&&document.fonts.load?document.fonts.load('800 20px Baloo2Z'):Promise.resolve()).catch(()=>{}).then(()=>{\n\"use strict\";\n"+game+'\n});'
t=open(f'{D}/template.html').read().replace('/*__AUDIO__*/',js).replace('/*__FONT__*/',font)
os.makedirs(f'{D}/..',exist_ok=True);open(f'{D}/../index.html','w').write(t);print(len(t),'bytes',len(clips),'clips')
