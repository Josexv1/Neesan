import * as React from "react";
import { Button, Intent, Slider } from "@blueprintjs/core";

import { Example } from "./Example";

export class CoreExample extends React.PureComponent {
  state = {
    sliderValue: 11
  };

  render() {
    return (
      <Example header="Core Sandbox">
        <h3>Buttons:</h3>
        <Button intent={Intent.PRIMARY} text="Primary" />
        <Button intent={Intent.WARNING} text="Warn" />
        <Button intent={Intent.DANGER} text="Danger" />
        <h3>Turn it up to 11:</h3>
        <Slider
          min={0}
          max={11}
          onChange={this.setSliderValue}
          value={this.state.sliderValue}
        />
      </Example>
    );
  }

  setSliderValue = (value) => {
    this.setState({
      sliderValue: value
    });
  };
}
