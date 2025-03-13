import baseAxios from '@/apis/axiosInstance';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InterestsStock, UserState } from './UserType';

// 이름, 포인트, 뱃지, 관심 투자 카테고리, 기부 목표 카테고리, 현재까지 누적 기부금액, 목표 기부금액, 현재 기부금액
const useStore = create<UserState>()(
  persist(
    (set) => ({
      username: '',
      cashbackStatus: {},
      cashbackStamps: [],
      points: 0,
      dollars: 0,
      pointHistory: [],
      dollarHistory: [],
      badges: [],
      interests: [],
      ownedStocks: [],
      interestsStock: [],
      goalCategory: '',
      totalDonations: 0,
      goalDonations: 0,
      currentDonations: 0,
      getPointCount: 5,
      setOwnedStocks: (stocks) => set(() => ({ ownedStocks: stocks })),

      updateUser: async () => {
        try {
          const response = await baseAxios.get('/user/두푼이');
          const data = response.data;

          set({
            username: data.name,
            cashbackStatus: data.cashbackStatus,
            cashbackStamps: data.cashbackStamps,
            points: data.cashback.points,
            dollars: data.cashback.dollars,
            pointHistory: data.cashback.history.pointHistory,
            dollarHistory: data.cashback.history.dollarHistory,
            badges: data.donate.history,
            interests: data.invest.category,
            ownedStocks: data.invest.ownedETFs,
            interestsStock: data.invest.interestedETFs,
            goalCategory: data.donate.category,
            totalDonations: data.donate.totalAmount,
            goalDonations: data.donate.targetAmount,
            currentDonations: data.donate.currentAmount,
          });
        } catch (error) {
          console.error('데이터 불러오기 실패:', error);
        }
      },

      setInterestsStock: (stocks: InterestsStock[]) => set(() => ({ interestsStock: stocks })),

      setPoints: async (amount, origin) => {
        const state = useStore.getState();
        if (origin === '기부') {
          await baseAxios
            .get(`/user/getPointInfo/${state.username}`)
            .then((response) => {
              console.log('point:', response.data);
              useStore.setState({
                points: response.data.points,
                pointHistory: response.data.history,
              });
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          try {
            const response = await baseAxios.post('/user/setPoint', {
              name: state.username,
              point: amount,
              origin: origin,
            });
            const data = response.data;
            console.log('data: ', data);

            if (!data) {
              throw new Error('잘못된 응답 형식');
            }

            useStore.setState({
              points: data.points,
              pointHistory: data.history,
            });
          } catch (error) {
            console.error('포인트 업데이트 실패:', error);
          }
        }
      }, // 포인트 추가/감소

      updatePoints: async () => {
        const state = useStore.getState();

        try {
          const response = await baseAxios.get(`/user/getPointInfo/${state.username}`);
          const data = response.data;

          if (!data) {
            throw new Error('잘못된 응답 형식');
          }

          useStore.setState({
            points: data.points,
            pointHistory: data.pointHistory,
          });
        } catch (error) {
          console.error('포인트 업데이트 실패:', error);
        }
      }, // 보유 포인트 업데이트

      updateDollars: async () => {
        const state = useStore.getState();

        try {
          // ✅ updateDollars 수정
          const response = await baseAxios.get(`/user/getPointInfo/${state.username}`);
          const data = response.data;

          if (!data) {
            throw new Error('잘못된 응답 형식');
          }

          useStore.setState({
            dollars: data.dollars,
            dollarHistory: data.dollarHistory,
          });
        } catch (error) {
          console.error('포인트 업데이트 실패:', error);
        }
      }, // 보유 달러 업데이트

      addStamp: (stamp) => {
        set((state) => ({ cashbackStamps: [...state.cashbackStamps, stamp] }));
      }, // 스탬프 추가
      resetStamp: () => set(() => ({ cashbackStamps: [] })), // 스탬프판 초기화

      addBadge: (badge) => set((state) => ({ badges: [...state.badges, badge] })), // 뱃지 추가

      setInterests: (interests) => set(() => ({ interests })), // 관심 투자 카테고리 설정

      setGoalCategory: (category) => set(() => ({ goalCategory: category })), // 기부 목표 카테고리 설정
      getTotalDonations: (amount) => set(() => ({ totalDonations: amount })), // 누적 기부 금액 조회
      updateTotalDonations: (amount) =>
        set((state) => ({ totalDonations: state.totalDonations + amount })), // 누적 기부 금액 추가
      setGoalDonations: (goal) => set({ goalDonations: goal }), // 목표 기부금액 설정
      getCurrentDonations: (amount) => set(() => ({ currentDonations: amount })), // 현재 기부 금액 조회
      updateCurrentDonations: (amount) =>
        set((state) => ({ currentDonations: state.currentDonations + amount })), // 현재 기부 금액 추가
      setGetPointCount: (count) => set((state) => ({ getPointCount: state.getPointCount - count })),
    }),
    { name: 'user-store' },
  ),
);

export default useStore;
