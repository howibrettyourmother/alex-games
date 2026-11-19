# TTS pipeline: piper (offline) -> per-line pitch (field 4, default 1.18) -> 24k mono mp3 into /tmp/dz, then build.py copies to src/clips
set -e
mkdir -p /tmp/dz && cd /tmp/dz
[ -f silent.mp3 ] || ffmpeg -y -loglevel error -f lavfi -i anullsrc=r=24000:cl=mono -t 1 -b:a 32k silent.mp3
while IFS='|' read -r k t v pr rec; do
  [ -z "$k" ] && continue
  [ "$v" = rec ] && continue
  [ "$v" = kv ] && continue  # kv = shared Kokoro kids-voice pack clip, already in src/clips
  [ -f $k.mp3 ] && [ "$FORCE" != 1 ] && continue
  if [ -n "$rec" ]; then /workspace/kids-hubs/animix.sh $k.mp3 "$t" $v ${pr:-1.18} $rec; continue; fi  # words + real animal recording
  pr=${pr:-1.18}
  echo "$t" | /workspace/.tts/venv/bin/piper -m /workspace/.tts/en_US-$v-medium.onnx -f raw_$k.wav --length-scale 0.95 >/dev/null 2>&1
  ffmpeg -y -loglevel error -i raw_$k.wav -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,asetrate=22050*$pr,aresample=24000,atempo=0.95,highpass=f=120,acompressor=threshold=-18dB:ratio=3,volume=1.7,alimiter=limit=0.95" -ac 1 -ar 24000 -b:a 32k $k.mp3
  echo $k $(stat -c%s $k.mp3)
done < "$(dirname "$0")/lines.txt"
