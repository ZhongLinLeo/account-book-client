import { FundsTrend } from '@/pages/Dashboard/data';
import { DualAxes } from '@ant-design/plots';
import React from 'react';

export type TrendProps = {
  trend: Partial<FundsTrend[]>;
};

const TrendAnalyze: React.FC<TrendProps> = (props) => {
  console.log(props.trend);

  const config = {
    data: [props.trend, props.trend],
    xField: 'fundsRecordDate',
    yField: ['income', 'expenditure'],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#3f8600',
      },
      {
        geometry: 'line',
        color: '#cf1322',
      },
    ],
  };

  return <DualAxes {...config} />;
};
export default TrendAnalyze;
