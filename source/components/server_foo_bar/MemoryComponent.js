import * as React from 'react'

class MemoryComponent extends React.Component {
  state = {
    percent: 0,
    meterValue: 0,
  }

  componentDidMount() {
    this.setUpSvgLogic();
    this.simulateStats();
  }

  render() {
    return (
      <div id="wrapper" ref="wrapper">
        <svg id="meter" ref="" meter>
          <circle id="outline_curves" ref="outline_curves" class="circle outline"
            cx="50%" cy="50%" r="250"></circle>

          <circle id="low" ref="low" class="circle range" cx="50%" cy="50%"
            stroke="#FDE47F" r="250"></circle>

          <circle id="avg" ref="avg" class="circle range" cx="50%" cy="50%"
            stroke="#7CCCE5" r="250"></circle>

          <circle id="high" ref="high" class="circle range" cx="50%" cy="50%"
            stroke="#E04644" r="250"></circle>

          <circle id="mask" ref="mask" class="circle" cx="50%" cy="50%" r="250" stroke-dasharray={this.setStrokeDashArray()} ></circle>

          <circle id="outline_ends" ref="outline_ends" class="circle outline"
            cx="50%" cy="50%" r="250"></circle>
        </svg>
        <img id="meter_needle" ref="meter_needle" src="gauge-needle.svg" style={{ transform: this.transformCircle() }} alt="" />
        <label id="lbl" ref="lbl" for="">{this.state.percent}</label>
      </div>
    );
  }


  setUpSvgLogic = () => {
    // Setup SVG defaults
    this.cf = 2 * Math.PI * 250;
    this.semi_cf = this.cf / 2;
    this.semi_cf_1by3 = this.semi_cf / 3;
    this.semi_cf_2by3 = this.semi_cf_1by3 * 2;

    this.refs.outline_curves.setAttribute("stroke-dasharray", this.semi_cf + "," + this.cf);
    this.refs.low.setAttribute("stroke-dasharray", this.semi_cf + "," + this.cf);
    this.refs.avg.setAttribute("stroke-dasharray", this.semi_cf_2by3 + "," + this.cf);
    this.refs.high.setAttribute("stroke-dasharray", this.semi_cf_1by3 + "," + this.cf);
    this.refs.outline_ends.setAttribute("stroke-dasharray", 2 + "," + (this.semi_cf - 2));

    this.mask = this.refs.mask;
    this.meter_needle = this.refs.meter_needle;

    this.setState({
      meterValue: this.semi_cf,
      percent: 0,
    });

  }

  getMemoryFromServer = () => {
    return new Promise((accept, reject) => {
      new Component('server_stats_react')
        .ajax('getStats', {}, {
          callback: (response) => {
            if (!response || response.status === 'bad') {
              reject('Failed ajax request');
            }

            if (response.status === 'good') {
              this.changePercent(response.data.memory)
              accept();
            }
          },
        });
    });
  }

  delayPromise = (time) => {
    return new Promise((accept) => {
      setTimeout(() => accept(), time);
    });
  }

  changePercent(percent) {
    const meterValue = this.semi_cf - ((percent * this.semi_cf) / 100);
    this.setState({
      meterValue: meterValue,
      percent: percent,
    });
  }

  setStrokeDashArray() {
    return this.state.meterValue + "," + this.cf;
  }

  transformCircle() {
    return "rotate(" + (270 + ((this.state.percent * 180) / 100)) + "deg)";
  }

  simulateStats() {
    // Simulating server polling 
    this.getMemoryFromServer()
      .then(() => this.delayPromise(1000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(2000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(1000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(3000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(1000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(1000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(5000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(2000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(1000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(1000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(1000))
      .then(() => this.getMemoryFromServer())
      .then(() => this.delayPromise(2000))
      .then(() => this.getMemoryFromServer())
      .catch((err) => console.log(err));
  }
}

export default MemoryComponent