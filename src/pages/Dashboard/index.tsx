import Overview from '@/pages/Dashboard/components/Overview';
import TrendAnalyze from '@/pages/Dashboard/components/TrendAnalyze';
import { fundsOverview, fundsTrend } from '@/pages/Dashboard/service';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import { useRequest } from 'umi';
import { Card, Space } from 'antd';

const Dashboard: React.FC = () => {
  const { data: overview } = useRequest(fundsOverview);
  const overviewData = overview || {};

  const { data: trend, error } = useRequest(() => fundsTrend({ trendType: 'WEEK' }));
  const trendData = trend || [];

  return (
    <PageContainer title={'分析概览'}>
      {/*  overview */}
      <Overview value={overviewData} />
      <Card style={{ marginTop: 16 }}>
        <Card style={{ marginTop: 16 }}>
          <TrendAnalyze trend={trendData} />
        </Card>
        <Card style={{ marginTop: 16 }}>
          <TrendAnalyze trend={trendData} />
        </Card>
        <Card style={{ marginTop: 16 }}>
          <TrendAnalyze trend={trendData} />
        </Card>
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
