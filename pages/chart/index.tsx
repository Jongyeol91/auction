import { MainChart } from '@/components/charts/MainChart';
import Button from '@/components/common/Button';
import { getPriceIndexCategory, getPriceIndexCategoryAll } from '@/lib/api/price-index';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

function Chart() {
  const [categoryId, setCategoryId] = useState<number>(1);
  const { data: priceIndexCategoryAllData } = useQuery(
    {
      queryKey: ['categoryAll'],
      queryFn: () => getPriceIndexCategoryAll(),
    },
    { enabled: !!user },
  );
  console.log(priceIndexCategoryAllData);

  const { data: priceIndexData } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: ({ queryKey }) => getPriceIndexCategory(queryKey[1]),
  });

  return (
    <ChartWrapper>
      <ChartInnerWrapper>
        <MainChart priceIndexData={priceIndexData} />
      </ChartInnerWrapper>
      <ChartButtonWrapper>
        {priceIndexCategoryAllData?.map((cv) => (
          <Button key={cv.id} onClick={() => setCategoryId(cv.id)} layoutMode="fullWidth">
            {cv.name}
          </Button>
        ))}
      </ChartButtonWrapper>
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  height: 400px;
  justify-content: space-between;
`;

const ChartInnerWrapper = styled.div`
  width: 100%;
`;

const ChartButtonWrapper = styled.div`
  width: 100px;
  display: flex;
  gap: 2px;
  flex-direction: column;
`;

export default Chart;
