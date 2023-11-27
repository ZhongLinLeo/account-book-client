import { FundsOverview } from '@/pages/Dashboard/data';
import { StatisticCard } from '@ant-design/pro-components';
import React from 'react/index';

const { Statistic } = StatisticCard;
const { Divider } = StatisticCard;

export type OverviewProps = {
  value: Partial<FundsOverview>;
};

const Overview: React.FC<OverviewProps> = (props) => {
  return (
    <StatisticCard.Group title={'收支概览'}>
      <StatisticCard title="总概览">
        <Statistic
          title="收入"
          precision={2}
          value={props.value.overview?.income}
          layout={'vertical'}
          status={'success'}
          prefix={'¥'}
          valueStyle={{ color: '#3f8600' }}
        />
        <Statistic
          title="支出"
          precision={2}
          value={props.value.overview?.expenditure}
          layout={'vertical'}
          status="error"
          prefix={'¥'}
          valueStyle={{ color: '#cf1322' }}
        />
      </StatisticCard>
      <Divider />
      <StatisticCard title="年概览">
        <Statistic
          title="收入"
          precision={2}
          value={props.value.yearOverview?.income}
          layout={'vertical'}
          status={'success'}
          prefix={'¥'}
          valueStyle={{ color: '#3f8600' }}
        />
        <Statistic
          title="支出"
          precision={2}
          value={props.value.yearOverview?.expenditure}
          layout={'vertical'}
          status="error"
          prefix={'¥'}
          valueStyle={{ color: '#cf1322' }}
        />
      </StatisticCard>
      <Divider />
      <StatisticCard title="月概览">
        <Statistic
          title="收入"
          precision={2}
          value={props.value.monthOverview?.income}
          layout={'vertical'}
          status={'success'}
          prefix={'¥'}
          valueStyle={{ color: '#3f8600' }}
        />
        <Statistic
          title="支出"
          precision={2}
          value={props.value.monthOverview?.expenditure}
          layout={'vertical'}
          status="error"
          prefix={'¥'}
          valueStyle={{ color: '#cf1322' }}
        />
      </StatisticCard>
      <Divider />
      <StatisticCard title="周概览">
        <Statistic
          title="收入"
          precision={2}
          value={props.value.weekOverview?.income}
          layout={'vertical'}
          status={'success'}
          prefix={'¥'}
          valueStyle={{ color: '#3f8600' }}
        />
        <Statistic
          title="支出"
          precision={2}
          value={props.value.weekOverview?.expenditure}
          layout={'vertical'}
          status="error"
          prefix={'¥'}
          valueStyle={{ color: '#cf1322' }}
        />
      </StatisticCard>
    </StatisticCard.Group>
  );
};
export default Overview;
