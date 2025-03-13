import styled from 'styled-components';
import PressMotion from '../PressMotion';
import blueCheckImage from '@/assets/Main/check_blue.png';
import greyCheckImage from '@/assets/Main/check_grey.png';
import { IoIosArrowDown } from 'react-icons/io';
import { colors } from '@/styles/colors';

const PointFilter = styled.div`
  display: flex;
  flex-direction: row;
`;

const PointNav = styled.div`
  display: flex;
  font-size: 1rem;
  height: 2rem;
  align-items: center;
  > img {
    width: 1rem;
    height: 0.6rem;
  }
`;

const NavContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CurrentNav = styled.div`
  height: 2rem;
  line-height: 2rem;
`;

//오버레이
const Overlay = styled.div<{ $clicked: boolean }>`
  display: ${({ $clicked }) => ($clicked ? 'block' : 'none')};
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
`;

//필터 리스트
const FilterList = styled.div<{ $clicked: boolean }>`
  display: ${({ $clicked }) => ($clicked ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  background-color: ${colors.Navy};
  width: 100%;
  max-width: 92%;
  border-radius: 1.2rem;
  padding: 1rem;
  z-index: 10;
  bottom: 1rem;
  left: 1rem;
`;

const SelectTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0;
`;

const SelectMenu = styled.ul`
  display: flex;
  flex-direction: column;
`;

const SelectItem = styled.li<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${({ $isSelected }) => ($isSelected ? colors.White : colors.Grey)};
  padding: 1rem 0;
  > img {
    width: 1rem;
    height: 1rem;
  }
`;

//PointHistory.tsx에서 filter.tsx로 전달
interface FilterProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Filter({
  selectedValue,
  setSelectedValue,
  clicked,
  setClicked,
}: FilterProps) {
  const filterOptions = ['전체', '적립 내역', '사용 내역'] as const;

  //필터링
  const handleClick = () => {
    setClicked(!clicked);
  };

  //클릭한 값으로 값이 바뀜
  const handleSelect = (filter: string) => {
    setSelectedValue(filter);
    setClicked(!clicked);
  };

  //overlay 클릭시 필터 닫기
  const closeFilter = () => {
    setClicked(false);
  };

  return (
    <>
      <PointFilter>
        <PointNav onClick={handleClick}>
          <PressMotion>
            <NavContent>
              <CurrentNav>{selectedValue}</CurrentNav>
              <IoIosArrowDown style={{ fontSize: '1.5rem' }} />
            </NavContent>
          </PressMotion>
        </PointNav>
      </PointFilter>
      <Overlay $clicked={clicked} onClick={closeFilter} />
      <FilterList $clicked={clicked}>
        <SelectTitle>내역 선택</SelectTitle>
        <SelectMenu>
          {filterOptions.map((item) => {
            return (
              <SelectItem
                key={item}
                onClick={() => handleSelect(item)}
                $isSelected={selectedValue === item}
              >
                <div>{item}</div>
                <img src={selectedValue === item ? blueCheckImage : greyCheckImage} />
              </SelectItem>
            );
          })}
        </SelectMenu>
      </FilterList>
    </>
  );
}
