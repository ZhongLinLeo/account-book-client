import ComposeAnalyze from '@/pages/Dashboard/components/ComposeAnalyze';
import Overview from '@/pages/Dashboard/components/Overview';
import TopsList from '@/pages/Dashboard/components/TopList';
import TrendAnalyze from '@/pages/Dashboard/components/TrendAnalyze';
import { fundsCompose, fundsOverview, fundsTop, fundsTrend } from '@/pages/Dashboard/service';
import { ProCard } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { useRequest } from 'umi';

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
