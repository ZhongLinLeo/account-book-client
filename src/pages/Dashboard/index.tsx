import Overview from '@/pages/Dashboard/components/Overview';
import TrendAnalyze from '@/pages/Dashboard/components/TrendAnalyze';
import { fundsCompose, fundsOverview, fundsTrend, fundsTop } from '@/pages/Dashboard/service';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { useRequest } from 'umi';
import { Card, Space } from 'antd';
import ComposeAnalyze from '@/pages/Dashboard/components/ComposeAnalyze';
import { ProCard } from '@ant-design/pro-components';
import TopsList from '@/pages/Dashboard/components/TopList';

const Dashboard: React.FC = () => {
  const { data: overview } = useRequest(fundsOverview);
  const overviewData = overview || {};

  const { data: trend } = useRequest(() => fundsTrend({ trendType: 'YEAR' }));
  const trendData = trend || [];

  const { data: compose } = useRequest(() => fundsCompose({ trendType: 'YEAR' }));
  const incomeCompose = compose?.incomeCompose || [];
  const expenditureCompose = compose?.expenditureCompose || [];

  const { data: top } = useRequest(() => fundsTop({ trendType: 'YEAR' }));
  const incomeTop = top?.incomeTops || [];
  const expenditureTop = top?.expenditureTops || [];

  return (
    <PageContainer title={'分析概览'}>
      <Overview value={overviewData} />
      <ProCard split="horizontal">
        <ProCard title="趋势">
          <TrendAnalyze trend={trendData} />
        </ProCard>
        <ProCard split="vertical" title="支出">
          <ProCard title="支出构成">
            <ComposeAnalyze compose={expenditureCompose} />
          </ProCard>
          <ProCard title="支出排行">
            <TopsList top={incomeTop} />
          </ProCard>
        </ProCard>

        <ProCard split="vertical" title="收入">
          <ProCard title="收入构成">
            <ComposeAnalyze compose={incomeCompose} />
          </ProCard>
          <ProCard title="收入排行">
            <TopsList top={expenditureTop} />
          </ProCard>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Dashboard;
