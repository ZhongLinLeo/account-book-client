import { Compose, FundsCompose } from '@/pages/Dashboard/data';
import { Pie } from '@ant-design/plots';

import React from 'react';

export type ComposeProps = {
  compose: Partial<Compose[]>;
};

const ComposeAnalyze: React.FC<ComposeProps> = (props) => {
  const config = {
    appendPadding: 10,
    data: props.compose,
    angleField: 'percent',
    colorField: 'classifyName',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
export default ComposeAnalyze;
