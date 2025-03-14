import baseAxios from '@/apis/axiosInstance';
import useStore from '@/store/User';
import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
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
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
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
  background-color: #007aff;
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
  background-color: #93beeb;
  &:hover {
    background-color: #79b3f0;
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
