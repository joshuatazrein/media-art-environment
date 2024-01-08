
var max, td, node, oscPort, audioIn, maxAudio, tdAudio;

oscPort.free;
Server.default.options.device = "BlackHoleIO";
s.options.numInputBusChannels = 64 + 2;
s.options.numOutputBusChannels = 64 + 2;
s.boot;

max = NetAddr("127.0.0.1", 7001);
td = NetAddr("127.0.0.1", 7002);
node = NetAddr("127.0.0.1", 7004);

maxAudio = Bus.new('audio', 8, 8, s);
audioIn = Bus.new('audio', 16, 8, s);
tdAudio = Bus.new('audio', 24, 8, s);

oscPort = OSCFunc({
    | message, time, addr |
    post(message);
}, '/hello', nil, recvPort: 7003);

max.sendMsg('/hello', 'from sc');
td.sendMsg('/hello', 'from sc');
node.sendMsg('/hello', 'from sc');
post(oscPort);

{
	Out.ar(maxAudio.subBus(0, 1), SinOsc.ar(220));
	Out.ar(tdAudio.subBus(0, 1), SinOsc.ar(220));
}.play;
