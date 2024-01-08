# This is a Library


**Video Inputs:**
- `jit.desktop` can record from Max

**Audio Inputs:**
- **0-1**: H4 input, headphone output (room for 8 channels available, first BlackHole ports fill in the rest)
- **8-15**: Max
- **16-23**: SuperCollider
- **24-31**: TouchDesigner
- **NB:** TouchDesigner and SuperCollider, because they make sense, have 0-indexed channels. Max has 1-indexed channels. This, because it makes sense, uses the 0-indexes.
- **NB:** MAKE SURE to set the SC server up with the right number of inputs/outputs or it won't recognize incoming audio.

**OSC Routing:**
- **7001** Max (max)
- **7002** TouchDesigner (td)
- **7003** SuperCollider (sc)
- **7004* Node (node)

**Max:**
- Receives OSC data in through `udpreceive`
- Processing incoming video and audio, outputting to BlackHole or output

**Node:**
- Node for Max API is enabled, with a socket that can send or receive messages between server and client
- You can't run this from Node - you have to start it from Max. 
- `react-three-fiber`, `pts.js`, `tailwindcss`, and `react-spring` preloaded in a Remix environment (allowing easy Scene management)
- Also compiles `js` objects automatically, which can `require` each other and external libraries

**TouchDesigner:**
- Screen grab to take input from Max or Node
- OSC data in from Max/SC/Node

**SuperCollider:**
- Receive OSC data in from Max/TouchDesigner
- Send out OSC/audio through BlackHole
- Sadly, you can't open SuperCollider in VS Code with full language support or formatting, so use the SuperCollider IDE.