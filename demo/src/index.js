import React, { Component } from 'react';
import { render } from 'react-dom';

import MidiContext from '../../src';

export default class Demo extends Component {
  render() {
    return (
      <MidiContext debug={true}>
        yo
      </MidiContext>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'));
