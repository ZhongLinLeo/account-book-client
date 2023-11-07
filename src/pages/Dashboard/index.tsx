import { PageContainer } from '@ant-design/pro-layout';
import React, { useRef, useState } from 'react';
import Overview from '@/pages/Dashboard/components/Overview';
import { accounts } from '@/pages/FinancialAccount/service';
import { useRequest } from 'umi';
import { fundsOverview } from '@/pages/Dashboard/service';

const Dashboard: React.FC = () => {
  const { data: overview } = useRequest(fundsOverview);
  const overviewData = overview || {};

  return (
    <PageContainer>
      {/*  overview */}
      <Overview value={overviewData} />
    </PageContainer>
  );
};

export default Dashboard;
