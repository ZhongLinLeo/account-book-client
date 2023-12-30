import { Compose } from '@/pages/Dashboard/data';
import { Pie } from '@ant-design/plots';

import ComposeByClassify from '@/pages/Dashboard/components/ComposeByClassify';
import React, { useState } from 'react';

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

  const [composeByClassifyVisible, handleComposeByClassifyVisible] = useState<boolean>(false);
  const [currentCompose, handleCurrentCompose] = useState<Compose>(null);

  const onReadyPie = (plot) => {
    plot.on('plot:click', (evt) => {
      console.log(evt);
      handleCurrentCompose(evt.data?.data);
      handleComposeByClassifyVisible(true);
    });
  };
  return (
    <>
      <Pie {...config} onReady={onReadyPie} />
      <ComposeByClassify
        composeByClassify={[]}
        onOpenChange={handleComposeByClassifyVisible}
        open={composeByClassifyVisible}
        composeInfo={currentCompose}
      />
    </>
  );
};
export default ComposeAnalyze;
