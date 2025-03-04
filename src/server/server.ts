import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/api/etf/:symbol', async (req: Request, res: Response) => {
  const { symbol } = req.params;

  // ✅ 5년치 데이터를 한 번에 가져오기
  const now = Math.floor(Date.now() / 1000);
  const period1 = now - 86400 * 365 * 5; // 5년 전

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${now}&interval=1d`;
    console.log(`📢 Fetching 5 years ETF Data: Symbol=${symbol}`);

    const response = await axios.get(url);
    const result = response.data?.chart?.result?.[0];

    if (!result) {
      console.warn(`⚠️ No data found for ${symbol}`);
      return res.status(404).json({ error: `ETF 데이터 없음 (${symbol})` });
    }

    res.json(response.data);
  } catch (error: any) {
    console.error(`❌ Error fetching data for ${symbol}:`, error.response?.data || error.message);
    res.status(500).json({ error: 'ETF 데이터를 가져오는 중 오류 발생' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
