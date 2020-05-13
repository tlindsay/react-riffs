import { includes } from 'lodash/collection';
import mockEvents from './webmidi/events';

export default {
  inputs: [{
    connection: 'open',
    id: '123456789',
    manufacturer: 'Arturia',
    name: 'Arturia KeyStep 32',
    state: 'connected',
    type: 'input',
    _userHandlers: {
      channel: {
        controlchange: { 1: [], 2: [], 3: [] },
        noteoff: { 1: [], 2: [], 3: [] },
        noteon: { 1: [], 2: [], 3: [] },
        pitchbend: { 1: [], 2: [], 3: [] }
      },
      system: {
        clock: [],
        start: [],
        stop: []
      }
    },
    addListener(type, channel, fn) {
      if (includes(Object.keys(this._userHandlers.system), type)) { // if system event
        this._userHandlers.system[type].push(() => fn(mockEvents[type]));
      } else { // if channel event
        if (channel === 'all') {
          Object.keys(this._userHandlers.channel[type]).forEach((key) => {
            this._userHandlers.channel[type][key].push(() => fn(mockEvents[type]));
          });
        } else {
          this._userHandlers.channel[type][channel].push(() => fn(mockEvents[type]));
        }
      }
    },
    removeListener() {
      this._userHandlers = {
        channel: {
          noteoff: { 1: [], 2: [], 3: [] },
          noteon: { 1: [], 2: [], 3: [] },
          pitchbend: { 1: [], 2: [], 3: [] }
        },
        system: {
          clock: [],
          start: [],
          stop: []
        }
      };
    }
  }],

  addListener(type, cb) { if (type === 'connected') cb({ port: this.inputs[0] }); },
  enable(cb) { cb(false); }
};
