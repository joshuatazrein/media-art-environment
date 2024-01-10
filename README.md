# This is a Library

**Audio Inputs:**
- **0-1**: H4 input, headphone output (room for 8 channels available, first BlackHole ports fill in the rest)
- **8-15**: Max
- **16-23**: SuperCollider
- **24-31**: TouchDesigner

**OSC Routing:**
- **7001** Max (max)
- **7002** TouchDesigner (td)
- **7003** SuperCollider (sc)
- **7004* Node (node)

**Max:**
- Receives OSC data in through `udpreceive`
- Processing incoming video and audio, outputting audio to BlackHole and OSC through `udpsend`
- `jit.desktop` to get video in
- *TODO*: get Jitter output into TD/Web easily

**Node:**
- Use `esbuild` to compile server to `server.js`, use `nodemon` to run it
- Use `vite` to hot-reload React app with `zustand`. `socket.io` powers state.
- Libraries: `react-three-fiber`, `@react-spring/three`, `datamuse`, `pts` (excellent for vectors), `three.js`

**TouchDesigner:**
- `Web Render TOP` to get video from web
- `Audio Device In CHOP` to get audio from BlackHole

**SuperCollider:**
- Receive OSC data in from Max/TouchDesigner
- Send out OSC/audio through BlackHole
- Sadly, you can't open SuperCollider in VS Code with full language support or formatting, so use the SuperCollider IDE.