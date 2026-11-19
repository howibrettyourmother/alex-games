# Piper amy @1.25 (same chain as gen.sh) for every phrase in phrases.tsv -> ../play/v/<id>.mp3 (skips existing)
set -e;D=$(cd $(dirname $0);pwd);O=$D/../v;mkdir -p $O /tmp/dzv
one(){ i=$1;t=$2;O=$3;[ -f $O/$i.mp3 ]&&return 0
 echo "$t"|/workspace/.tts/venv/bin/piper -m /workspace/.tts/en_US-amy-medium.onnx -f /tmp/dzv/$i.wav --length-scale 0.95 >/dev/null 2>&1
 ffmpeg -y -loglevel error -i /tmp/dzv/$i.wav -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,asetrate=22050*1.25,aresample=24000,atempo=0.95,highpass=f=120,acompressor=threshold=-18dB:ratio=3,volume=1.7,alimiter=limit=0.95" -ac 1 -ar 24000 -b:a 32k $O/$i.mp3;rm -f /tmp/dzv/$i.wav;}
export -f one
while IFS='|' read -r i t;do printf '%s\0%s\0%s\0' "$i" "$t" "$O";done<$D/phrases.tsv|xargs -0 -n3 -P6 bash -c 'one "$0" "$1" "$2"'
ls $O|wc -l
