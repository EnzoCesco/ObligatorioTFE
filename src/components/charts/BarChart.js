import React, { PureComponent } from 'react';
import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

export default class HorizontalBar extends PureComponent {

  constructor(props){
    super();
  }

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/shjsn5su/';

  render() {
    let data = this.props.data.map(d => ({Name: d.nombre, Gasto: d.total}));
    return (
      <ComposedChart
        layout="vertical"
        width={500}
        height={400}
        data={data}
        margin={{
          top: 50, right: 60, bottom: 20, left: 50,
        }}
      >
        <CartesianGrid stroke="#CDCDCD" />
        <XAxis type="number" />
        <YAxis dataKey="Name" type="category" />
        <Tooltip />
        <Bar dataKey="Gasto" barSize={20} fill="#f44336" />
      </ComposedChart>
    );
  }
}
