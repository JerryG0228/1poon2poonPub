// npm install -g ts-node
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
  const { range = '1y' } = req.query;

  const intervalMap: { [key: string]: string } = {
    '1d': '15m',
    '5d': '30m',
    '1mo': '1d',
    '1y': '1wk',
    max: '1mo',
  };

  const interval = intervalMap[range as string] || '1d';

  const now = Math.floor(Date.now() / 1000);
  let period1: number = now - 86400 * 365;

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${now}&interval=${interval}`;
    console.log(`📢 Fetching ETF Data: Symbol=${symbol}, Range=${range}, Interval=${interval}`);

    const response = await axios.get(url);
    const result = response.data?.chart?.result;

    if (!result || result.length === 0) {
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
