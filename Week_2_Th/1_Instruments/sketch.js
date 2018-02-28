var duoSynth, fmSynth, metalSynth, membrane;

function setup() {
	//Visualization 
	//setup audio context 
	Nexus.context = Tone.context

	//remember to set DIV in html file 
	var spectrogram = new Nexus.Spectrogram('#spec')
	spectrogram.connect(Tone.Master);

	var oscilloscope = new Nexus.Oscilloscope('#osc')
	oscilloscope.connect(Tone.Master);

	duoSynth = new Tone.DuoSynth({
		vibratoAmount: 2,
		vibratoRate: 20,
		harmonicity: 1.5,
		voice0: {
			volume: -10,
			portamento: 0,
			oscillator: {
				type: 'sine'
			},
			filterEnvelope: {
				attack: 0.1,
				decay: 0,
				sustain: 1,
				release: 0.5
			},
			envelope: {
				attack: 0.1,
				decay: 0,
				sustain: 1,
				release: 0.5
			}
		},
		voice1: {
			volume: -10,
			portamento: 0,
			oscillator: {
				type: 'sine'
			},
			filterEnvelope: {
				attack: 0.5,
				decay: 0,
				sustain: 1,
				release: 0.5
			},
			envelope: {
				attack: 0.5,
				decay: 0,
				sustain: 1,
				release: 0.5
			}
		}
	}).toMaster();

	//add more instruments 
	fmSynth = new Tone.FMSynth({
		harmonicity: 3,
		modulationIndex: 10
	}).toMaster();

	metalSynth = new Tone.MetalSynth({
		frequency: 200,
		envelope: {
			attack: 0.001,
			decay: 1.4,
			release: 0.2
		},
		harmonicity: 5.1,
		modulationIndex: 32,
		resonance: 4000,
		octaves: 1.5
	}).toMaster();

	membrane = new Tone.MembraneSynth().toMaster();
}

function mousePressed() {
	play(membrane);
}
//lets schedule some events in a function so it can be turned 
//on and off 
function play(synth) {
	if (synth == metalSynth) {
		synth.triggerAttackRelease('4n', "+0.1")
		synth.triggerAttackRelease('4n', "+1")
		synth.triggerAttackRelease('8n', "+2")
		synth.triggerAttackRelease('8n', "+3");
		var choices = random([0, 1]);
		console.log(choices);
		if (choices == 0) {
			synth.frequency.rampTo(400, 2);
			synth.frequency.rampTo(200, 2, "+2");
		} else {
			synth.frequency.setValueAtTime(100);
			synth.frequency.setValueAtTime(200, '+1');
			synth.frequency.setValueAtTime(150, '+2');
			synth.frequency.setValueAtTime(300, "+3");
		}
	} else {
		//other synths take freq values 
		synth.triggerAttackRelease('C4', '4n', "+0.1")
		synth.triggerAttackRelease('D4', '4n', "+1")
		synth.triggerAttackRelease('E4', '8n', "+2")
		synth.triggerAttackRelease('F#4', '8n', "+3");
	}

	if (synth == fmSynth) {
		//ramp up to 50 over 2 seconds
		synth.modulationIndex.rampTo(50, 2);
		//ramp back down to 10 starting at 2 seconds and take 2 seconds to do it 
		synth.modulationIndex.rampTo(10, 2, "+2");

		console.log(synth.modulationIndex.value)
	} else {
		console.log('bye')
	}
}