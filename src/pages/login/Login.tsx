import baseAxios from '@/apis/axiosInstance';
import useStore from '@/store/User';
import { colors } from '@/styles/colors';
import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 2rem;
  background: rgb(30, 34, 42);
  border-radius: 12px;
  box-shadow: 0px 4px 30px rgb(70, 70, 70);
  text-align: center;
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
  color: white;
  background-color: #313846;
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

const SignupButton = styled(Button)`
  background-color: rgb(81, 130, 187);
  &:hover {
    background-color: rgb(149, 193, 241);
  }
  &:active {
    background-color: #4191e6;
  }
`;

export default function Login() {
  const navigate = useNavigate();

  const { updateUser } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await baseAxios.post('/user/login', {
        name: username,
        password,
      });

      console.log(response.data);

      await updateUser(username);

      navigate('/');
    } catch (error: any) {
      if (error.response.status === 401) {
        alert('비밀번호가 일치하지 않습니다.');
        console.log(error);
      } else if (error.response.status === 404) {
        alert('해당 유저가 존재하지 않습니다.');
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>로그인</div>
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
            <Button type="submit">로그인</Button>
            <SignupButton type="button" onClick={() => navigate('/signup')}>
              회원가입
            </SignupButton>
          </Form>
        </FormWrapper>
      </div>
    </Container>
  );
}
