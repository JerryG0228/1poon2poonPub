// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import Btn from '@/components/Btn';
// import { colors } from '@/styles/colors';
// import PressMotion from '@/components/PressMotion';

// const Box = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 1.5rem;
//   font-weight: bold;
//   padding: 1rem;
// `;

// const Title = styled.div`
//   font-size: 1.4rem;
//   color: white;
//   margin-bottom: 1rem;
// `;

// const InputWrapper = styled.div`
//   margin-top: 1.5rem;
//   padding: 1rem;
//   background-color: #313845;
//   border-radius: 1.2rem;
//   display: flex;
//   flex-direction: column;
//   gap: 0.6rem;
// `;

// const Label = styled.p`
//   font-size: 1.15rem;
//   color: white;
// `;

// const InputAmount = styled.input`
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: white;
//   background: transparent;
//   border: none;
//   border-bottom: 1px solid #aaa;
//   padding: 0.5rem 0;
//   &:focus {
//     outline: none;
//     border-color: white;
//   }
// `;

// const ResultText = styled.p`
//   font-size: 1.1rem;
//   color: #f1f3f5;
//   margin-top: 1rem;
// `;

// const ExchangeButton = styled.button`
//   margin-top: 2rem;
//   padding: 0.8rem;
//   background-color: #ef4452;
//   color: white;
//   font-size: 1rem;
//   font-weight: bold;
//   border: none;
//   border-radius: 0.6rem;
//   cursor: pointer;
//   &:disabled {
//     background-color: #6b7683;
//     cursor: not-allowed;
//   }
// `;

// const USDExchangeRate = () => {
//   const [rate, setRate] = useState<number | null>(null);
//   const [won, setWon] = useState('');
//   const [usd, setUsd] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchRate = async () => {
//       try {
//         const res = await axios.get('https://m.search.naver.com/p/csearch/content/qapirender.nhn', {
//           params: {
//             key: 'calculator',
//             pkid: 141,
//             q: '환율',
//             where: 'm',
//             u1: 'keb',
//             u6: 'standardUnit',
//             u7: 0,
//             u3: 'USD',
//             u4: 'KRW',
//             u8: 'down',
//             u2: 1,
//           },
//         });
//         const rateStr = res.data?.country?.[1]?.value?.replace(',', '');
//         if (rateStr) setRate(parseFloat(rateStr));
//       } catch (err) {
//         console.error('❌ 환율 정보 가져오기 실패:', err);
//       }
//     };

//     fetchRate();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const wonValue = e.target.value;
//     setWon(wonValue);
//     if (rate && !isNaN(Number(wonValue))) {
//       setUsd(Number(wonValue) / rate);
//     } else {
//       setUsd(null);
//     }
//   };

//   const handleExchange = () => {
//     if (usd) {
//       alert(`💵 ${Number(won).toLocaleString()}원은 약 ${usd.toFixed(2)} USD 입니다.`);
//     }
//   };

//   return (
//     <Box>
//       <Title>달러 환율 계산기</Title>
//       {rate ? (
//         <>
//           <InputWrapper>
//             <Label>현재 환율</Label>
//             <ResultText>1 USD ≈ {rate.toLocaleString()} KRW</ResultText>
//           </InputWrapper>

//           <InputWrapper>
//             <Label>원화 입력</Label>
//             <InputAmount
//               type="number"
//               value={won}
//               onChange={handleChange}
//               placeholder="₩ 원화 금액 입력"
//             />
//             {usd !== null && <ResultText>💵 환전 결과: {usd.toFixed(2)} USD</ResultText>}
//           </InputWrapper>

//           {/* <ExchangeButton onClick={handleExchange} disabled={!usd}>
//             환전하기
//           </ExchangeButton> */}
//           <Btn
//             bgColor={colors.Blue}
//             handleBtn={() => {
//               handleExchange;
//             }}
//           >
//             <PressMotion>
//               <div style={{ width: '21.5rem' }}>환전하기</div>
//             </PressMotion>
//           </Btn>
//         </>
//       ) : (
//         <ResultText>환율 정보를 불러오는 중입니다...</ResultText>
//       )}
//     </Box>
//   );
// };

// export default USDExchangeRate;
