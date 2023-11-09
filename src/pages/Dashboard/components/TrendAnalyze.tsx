import { FundsTrend } from '@/pages/Dashboard/data';
import { Line } from '@ant-design/plots';
import React from 'react';

export type TrendProps = {
  trend: Partial<FundsTrend[]>;
};

const TrendAnalyze: React.FC<TrendProps> = (props) => {
  const config = {
    data: props.trend,
    xField: 'fundsRecordDate',
    yField: 'balance',
    seriesField: 'fundsType',
    xAxis: {
      type: 'time',
    },
    color: ['#3f8600', '#cf1322'],
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };

  return <Line {...config} />;
};
export default TrendAnalyze;
