import Overview from '@/pages/Dashboard/components/Overview';
import TrendAnalyze from '@/pages/Dashboard/components/TrendAnalyze';
import { fundsOverview, fundsTrend } from '@/pages/Dashboard/service';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { useRequest } from 'umi';

const Dashboard: React.FC = () => {
  const { data: overview } = useRequest(fundsOverview);
  const overviewData = overview || {};

  const { data: trend, error } = useRequest(() => fundsTrend({ trendType: 'WEEK' }));
  const trendData = trend || [];

  return (
    <PageContainer>
      {/*  overview */}
      <Overview value={overviewData} />
      <TrendAnalyze trend={trendData} />
    </PageContainer>
  );
};

export default Dashboard;
