import baseAxios from '@/apis/axiosInstance';
import { colors } from '@/styles/colors';
import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 2rem;
  background: rgb(30, 34, 42);

  border-radius: 12px;
  box-shadow: 0px 4px 30px rgb(70, 70, 70);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${colors.Grey};
  border-radius: 8px;
  outline: none;
  background-color: #313846;
  color: white;
  transition: border 0.2s ease-in-out;
  &:focus {
    border-color: #007aff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: rgb(0, 100, 206);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #005ecb;
  }
  &:active {
    background-color: #0047a3;
  }
`;

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const isSignup: boolean = true;
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await baseAxios
        .post('/user', {
          name: username,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          }
        })
        .then(() => {
          alert('회원가입 성공');
          navigate('/login');
        });
    } catch (error: any) {
      if (error.response.status === 400) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <div>회원가입</div>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="이름"
              value={username}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setUsername(e.target.value)
              }
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
            />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordCheck}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setPasswordCheck(e.target.value)
              }
            />
            <Button type="submit">{isSignup ? '가입하기' : '로그인'}</Button>
          </Form>
        </FormWrapper>
      </div>
    </Container>
  );
}
