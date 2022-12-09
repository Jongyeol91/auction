import { MainChart } from '@/components/charts/MainChart';
import Button from '@/components/common/Button';
import BasicTemplete from '@/components/templates/BasicTemplate';
import TabTamplete from '@/components/templates/TabTemplate';
import { getPriceIndexCategory, getPriceIndexCategoryAll } from '@/lib/api/price-index';
import { checkIsLoggedIn } from '@/lib/protectedRotue';
import { userAtom } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Chart() {
  const router = useRouter();
  const { id } = router.query;

  const [categoryId, setCategoryId] = useState<number>(id);
  const [user, setUser] = useAtom(userAtom);

  const getUser = async () => {
    const user = await checkIsLoggedIn();
    setUser(user);
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  const { data: priceIndexCategoryAllData } = useQuery({
    queryKey: ['categoryAll'],
    queryFn: () => getPriceIndexCategoryAll(),
  });

  const { data: priceIndexData } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: ({ queryKey }) => getPriceIndexCategory(queryKey[1]),
  });

  return (
    <TabTamplete hasBackButton>
      <ChartWrapper>
        <ChartInnerWrapper>
          <MainChart priceIndexData={priceIndexData} />
        </ChartInnerWrapper>
        <ChartButtonWrapper>
          {priceIndexCategoryAllData?.map((cv) => (
            <Button
              key={cv.id}
              isSelected={cv.id == categoryId}
              onClick={() => setCategoryId(cv.id)}
              layoutMode="fullWidth"
            >
              {cv.name}
            </Button>
          ))}
        </ChartButtonWrapper>
      </ChartWrapper>
    </TabTamplete>
  );
}

const ChartWrapper = styled.div`
  width: 1200px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  height: 400px;
  justify-content: center;
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
