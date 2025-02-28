import ETFBox from '@/components/ETFBox';

export default function Main() {
  return (
    <div>
      <div>
        <ETFBox name={'토스 뱅크 ETF'} price={4000} transPrice={5000} isRecommend={true}></ETFBox>
      </div>
    </div>
  );
}
