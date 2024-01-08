
var audioIn;

s.options.numInputBusChannels = 66;
s.options.numOutputBusChannels = 66;
s.boot;

audioIn = Bus.new('audio', 0, 8, s);
{ Out.ar(64, SoundIn.ar(64)) }.play;
