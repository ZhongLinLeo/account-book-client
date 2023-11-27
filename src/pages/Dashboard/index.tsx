import ComposeAnalyze from '@/pages/Dashboard/components/ComposeAnalyze';
import Overview from '@/pages/Dashboard/components/Overview';
import TopsList from '@/pages/Dashboard/components/TopList';
import TrendAnalyze from '@/pages/Dashboard/components/TrendAnalyze';
import { fundsCompose, fundsOverview, fundsTop, fundsTrend } from '@/pages/Dashboard/service';
import { ProCard } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { Select } from 'antd';
import React, { useState } from 'react';
import { useRequest } from 'umi';

const Dashboard: React.FC = () => {
  const { data: overview } = useRequest(fundsOverview);
  const overviewData = overview || {};

  const [trendType, setTrendType] = useState('MONTH');

  const handleTrendTypeChange = (value) => {
    console.log(value);
    setTrendType(value);
  };

  const { data: trend } = useRequest(() => fundsTrend({ trendType: trendType }), {
    refreshDeps: [trendType],
  });
  const trendData = trend || [];

  const { data: compose } = useRequest(() => fundsCompose({ trendType: trendType }), {
    refreshDeps: [trendType],
  });
  const incomeCompose = compose?.incomeCompose || [];
  const expenditureCompose = compose?.expenditureCompose || [];

  const { data: top } = useRequest(() => fundsTop({ trendType: trendType }), {
    refreshDeps: [trendType],
  });
  const incomeTop = top?.incomeTops || [];
  const expenditureTop = top?.expenditureTops || [];

  return (
    <PageContainer>
      <Overview value={overviewData} />
      <ProCard
        title={'收支分析'}
        split="horizontal"
        extra={
          <Select
            name="trendType"
            defaultValue="MONTH"
            onChange={handleTrendTypeChange}
            options={[
              {
                value: 'YEAR',
                label: '年',
              },
              {
                value: 'MONTH',
                label: '月',
              },
              {
                value: 'WEEK',
                label: '周',
              },
            ]}
          />
        }
      >
        <ProCard title="趋势">
          <TrendAnalyze trend={trendData} />
        </ProCard>
        <ProCard split="vertical" title="支出">
          <ProCard title="支出构成">
            <ComposeAnalyze compose={expenditureCompose} />
          </ProCard>
          <ProCard title="支出排行">
            <TopsList top={expenditureTop} expenditure={true} />
          </ProCard>
        </ProCard>

        <ProCard split="vertical" title="收入">
          <ProCard title="收入构成">
            <ComposeAnalyze compose={incomeCompose} />
          </ProCard>
          <ProCard title="收入排行">
            <TopsList top={incomeTop} expenditure={false} />
          </ProCard>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
