import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';

import { IoChevronBackSharp } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useStore from '@/store/User';
import baseAxios from '@/apis/axiosInstance';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0rem;
  padding: 1rem;
  z-index: 1000;
  background-color: ${colors.Navy};
`;

const Icon = styled.div`
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:active {
    opacity: 0.6;
  }
`;

const backNavigationMap: Record<string, string> = {};

export default function HeartLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { username, setInterestsStock } = useStore();
  const { symbol } = useParams<{ symbol: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!symbol) return;
    baseAxios
      .get(`/invest/getData/${symbol}`)
      .then((res) => {
        console.log('ETF API 응답:', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error('데이터 불러오기 실패:', err);
      });
  }, [symbol]);

  useEffect(() => {
    if (username && symbol) {
      baseAxios
        .get(`/invest/getInterestEtf/${username}`)
        .then((res) => {
          const list = res.data || [];
          setInterestsStock(list);
          setIsFavorite(list.some((etf: any) => etf.name === symbol));
        })
        .catch((err) => {
          console.error('관심 ETF 불러오기 실패:', err);
        });
    }
  }, [symbol, username]);

  const HandleBackClick = () => {
    const currentPath = location.pathname;

    if (backNavigationMap[currentPath]) {
      navigate(backNavigationMap[currentPath]);
    } else {
      navigate(-1);
    }
  };

  const toggleFavorite = async () => {
    const meta = data?.chart?.result?.[0]?.meta;
    const currentPrice = meta?.regularMarketPrice ?? 0;
    const previousClose = meta?.chartPreviousClose ?? 0;
    const changeRate =
      previousClose && previousClose !== 0
        ? ((currentPrice - previousClose) / previousClose) * 100
        : 0;

    try {
      const url = '/invest/setInterestEtf';

      await baseAxios.post(url, {
        name: username,
        etfName: symbol,
        price: currentPrice,
        changeRate,
      });

      const updated = await baseAxios.get(`/invest/getInterestEtf/${username}`);
      setInterestsStock(updated.data);
      setIsFavorite(updated.data.some((etf: any) => etf.name === symbol));
    } catch (err) {
      console.error('관심 ETF 등록/해제 실패:', err);
    }
  };

  return (
    <div>
      <Top>
        <Icon onClick={HandleBackClick}>
          <IoChevronBackSharp color={colors.White} size="1.5rem" />
        </Icon>
        <Icon onClick={toggleFavorite}>
          <FaHeart color={isFavorite ? '#FF0000' : '#CCCCCC'} size="1.5rem" />
        </Icon>
      </Top>
      <Outlet />
    </div>
  );
}
