interface pointHistory {
  name: string;
  day: string;
  time: string;
  change: number;
  finalPoints: number;
  _id: string;
}
interface dollarHistory {
  name: string;
  day: string;
  time: string;
  change: number;
  finalDollars: number;
  _id: string;
}

interface OwnedStocks {
  name: string;
  price: number;
  changeRate: number;
  quantity: number;
  _id: string;
}

interface InterestsStock {
  name: string;
  price: number;
  changeRate: number;
  _id: string;
}

interface BadgeItem {
  _id: { $oid: string };
  badge: string;
  donateInfo: {
    username: string;
    donateAmount: number;
    content: string;
    day: string;
    animation: string;
  };
}

interface UserState {
  username: string;
  cashbackStatus: { [key: string]: boolean };
  cashbackStamps: number[];
  points: number;
  dollars: number;
  pointHistory: pointHistory[];
  dollarHistory: dollarHistory[];
  badges: BadgeItem[];
  interests: string[];
  ownedStocks: OwnedStocks[];
  interestsStock: InterestsStock[];
  goalCategory: string;
  totalDonations: number;
  goalDonations: number;
  currentDonations: number;
  getPointCount: number;

  setOwnedStocks: (stocks: OwnedStocks[]) => void;

  updateUser: () => void;
  setPoints: (amount: number, origin: string) => void;
  updatePoints: () => void;
  updateDollars: () => void;
  addStamp: (stamp: number) => void;
  resetStamp: () => void;
  addBadge: (badge: BadgeItem) => void;
  setInterests: (interests: string[]) => void;
  setGoalCategory: (category: string) => void;
  getTotalDonations: (amount: number) => void;
  updateTotalDonations: (amount: number) => void;
  setGoalDonations: (goal: number) => void;
  getCurrentDonations: (amount: number) => void;
  updateCurrentDonations: (amount: number) => void;
  setGetPointCount: (count: number) => void;
}

export type { pointHistory, dollarHistory, OwnedStocks, InterestsStock, UserState, BadgeItem };
