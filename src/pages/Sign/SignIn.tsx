import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import Logo from '@/assets/Pay/Logo.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb;
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

const Title = styled.h2`
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
  /* transition: background 0.2s;
  &:hover {
    background-color: #005ecb;
  }
  &:active {
    background-color: #0047a3;
  } */
`;

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isSignup: boolean = true;
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(isSignup ? 'Signup' : 'Login', { username, password });
  };

  return (
    <Container>
      <FormWrapper>
        <Title>{isSignup ? '회원가입' : '로그인'}</Title>
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
          <Button type="submit">{isSignup ? '가입하기' : '로그인'}</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
}
