# 🧑‍🎤 react-riffs

[![Build Status](https://travis-ci.com/tlindsay/react-riffs.svg?branch=master)](https://travis-ci.com/tlindsay/react-riffs)
[![npm](https://img.shields.io/npm/v/react-riffs)](https://www.npmjs.com/package/react-riffs)
[![Coverage Status](https://coveralls.io/repos/github/tlindsay/react-riffs/badge.svg?branch=master)](https://coveralls.io/github/tlindsay/react-riffs?branch=master)

React Hooks + MIDI 🎹 = 🎶 Riffs 🎶

## Contents

* [`useMidiInputs`](#usemidiinputs)
* [`useClock`](#useclock)
* [`useNote`](#usenote)
* [`useNotes`](#usenotes)
* [`usePitchbend`](#usepitchbend)

## Usage

React Riffs exposes several hooks for use with the WebMIDI API. It wraps the excellent [WebMidi.js](https://github.com/djipco/webmidi), so refer to [their documentation](https://djipco.github.io/webmidi/latest/) for event reference, etc.

### `useMidiInputs`

In order to make use of Riffs, you first need to invoke the `useMidiInputs` hook. This will bootstrap WebMidi and return an array of connected [`Inputs`](https://djipco.github.io/webmidi/latest/classes/Input.html):

```js
let [myInput] = useMidiInputs();

console.log(myInput);
//=> Input {_userHandlers: {...}, _midiInput: MIDIInput, ...}
```

`useMidiInputs` takes an optional `debug` flag, which will add listeners to log the following events to the console: `noteon`, `pitchbend`, `start`, `stop`

```js
let [myInput] = useMidiInputs({ debug: true });
```

Once you have your `input`, you can start reading from your input device. Just remember to pass your input object each time you invoke an event hook.

**Each of the following takes an optional channel as the second parameter. If no channel is specified, it will default to `'all'`.**

### `useClock`
Returns the current timestamp from the input device
```js
let timestamp = useClock(myInput);

console.log(timestamp);
//=> 1234.1234567890123
```

### `useNote`
**NOTE: You probably want [`useNotes`](#usenotes)**

Returns the most recent [`noteon`](https://djipco.github.io/webmidi/latest/classes/Input.html#event_noteon)/[`noteoff`](https://djipco.github.io/webmidi/latest/classes/Input.html#event_noteoff) event, along with a Boolean flag for whether the note is being played
```js
let [noteEvent, isOn] = useNote(myInput);

console.log(noteEvent);
//=> {target: Input, data: Uint8Array(3), type: "noteon", ...}

console.log(isOn);
//=> true
```

### `useNotes`
Returns an array of [`noteon` events](https://djipco.github.io/webmidi/latest/classes/Input.html#event_noteon) for all of the notes currently being played
```js
let pressedKeys = useNotes(myInput);

console.log(pressedKeys);
//=> [{target: Input, data: Uint8Array(3), type: "noteon" ...}]
```

### `usePitchbend`
Returns a float between `-1.0` and `1.0` for the current pitchbend value. No bend is `0.0`
```js
let bend = usePitchbend(myInput);

console.log(bend);
//=> 0
```
