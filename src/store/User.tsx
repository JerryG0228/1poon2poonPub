import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PointHistory {
  name: string;
  day: string;
  time: string;
  change: number;
  finalPoints: number;
  _id: string;
}

interface UserState {
  username: string;
  cashbackStatus: { [key: string]: boolean };
  cashbackStamps: number[];
  points: number;
  pointHistory: PointHistory[];
  badges: string[];
  interests: string[];
  goalCategory: string;
  totalDonations: number;
  goalDonations: number;
  currentDonations: number;

  setDefault: (
    name: string,
    cashbackStatus: { [key: string]: boolean },
    stamps: number[],
    point: number,
    pointHistory: PointHistory[],
    badge: string[],
    interest: string[],
    goalCategory: string,
    totalDonation: number,
    goalDonation: number,
    currentDonation: number,
  ) => void;
  setName: (name: string) => void;
  addPoints: (amount: number) => void;
  subPoints: (amount: number) => void;
  addBadge: (badge: string) => void;
  setInterests: (interests: string[]) => void;
  setGoalCategory: (category: string) => void;
  getTotalDonations: (amount: number) => void;
  updateTotalDonations: (amount: number) => void;
  setGoalDonations: (goal: number) => void;
  getCurrentDonations: (amount: number) => void;
  updateCurrentDonations: (amount: number) => void;
}

// 이름, 포인트, 뱃지, 관심 투자 카테고리, 기부 목표 카테고리, 현재까지 누적 기부금액, 목표 기부금액, 현재 기부금액
const useStore = create<UserState>()(
  persist(
    (set) => ({
      username: '',
      cashbackStatus: {},
      cashbackStamps: [],
      points: 0,
      pointHistory: [],
      badges: [],
      interests: [],
      goalCategory: '',
      totalDonations: 0,
      goalDonations: 0,
      currentDonations: 0,

      setDefault: (
        name,
        cashbackStatus,
        stamps,
        point,
        pointHistory,
        badge,
        interest,
        goalCategory,
        totalDonation,
        goalDonation,
        currentDonation,
      ) =>
        set(() => ({
          username: name,
          cashbackStatus: cashbackStatus,
          cashbackStamps: stamps,
          points: point,
          pointHistory: pointHistory,
          badges: badge,
          interests: interest,
          goalCategory: goalCategory,
          totalDonations: totalDonation,
          goalDonations: goalDonation,
          currentDonations: currentDonation,
        })), // 기본값 설정

      setName: (name) => set(() => ({ username: name })), // 유저 이름 설정

      addPoints: (amount) => set((state) => ({ points: state.points + amount })), // 포인트 추가
      subPoints: (amount) => set((state) => ({ points: state.points - amount })), // 포인트 감소

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
    }),
    { name: 'user-store' },
  ),
);

export default useStore;
