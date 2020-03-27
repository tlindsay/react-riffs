import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebMidi from 'webmidi';
import retry from 'async-retry';

MidiContext.propTypes = {
  children: PropTypes.array,
  debug: PropTypes.bool
};

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
          }
        }
      });
    });
  }

  addDebugListeners() {
    this.state.inputs.forEach((input) => {
      input.addListener('noteon', 'all', () => console.log('noteon'));
      input.addListener('pitchbend', 'all', () => console.log('pitchbend'));
      input.addListener('start', 'all', () => console.log('start'));
      input.addListener('stop', 'all', () => console.log('stop'));
      input.addListener('reset', 'all', () => console.log('reset'));
    });
  }

  render() {
    return (
      <>{this.props.children}</>
    );
  }
}

export default MidiContext;
