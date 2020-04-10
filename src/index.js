import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebMidi from 'webmidi';
import retry from 'async-retry';

class MidiContext extends Component {
  constructor() {
    super(...arguments);
    this.state = { inputs: [] };

    this.initializeMidi();
  }

  componentWillUnmount() {
    console.info('Removing MIDI event listeners');
    this.state.inputs.forEach((input) => input.removeListener());
  }

  async initializeMidi() {
    await retry(async () => {
      console.info('Attempting to initialize MIDI');
      WebMidi.enable((err) => {
        if (!err) {
          console.info('MIDI enabled');
          this.state.inputs = WebMidi.inputs;

          if (this.props.debug) {
            this.addDebugListeners();
            WebMidi.addListener('connected', () => {
              console.log('new connection');
              this.addDebugListeners();
            });
            WebMidi.addListener('disconnected', () => console.log('connection lost'));
          }
        }
      });
    });
  }

  addDebugListeners() {
    this.state.inputs.forEach((input) => {
      input.addListener('noteon', 'all', (e) => console.log('noteon', e));
      input.addListener('pitchbend', 'all', (e) => console.log('pitchbend', e));
      input.addListener('start', 'all', (e) => console.log('start', e));
      input.addListener('stop', 'all', (e) => console.log('stop', e));
      input.addListener('reset', 'all', (e) => console.log('reset', e));
    });
  }

  render() {
    return (
      <>{this.props.children}</>
    );
  }
}

MidiContext.propTypes = {
  children: PropTypes.array,
  debug: PropTypes.bool
};

export default MidiContext;
