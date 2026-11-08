import styled from 'styled-components';

import { Logo } from './Logo.tsx';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
`;

const LogoBox = styled.div`
  width: 96px;
  height: 96px;
`;

export const Loader = () => (
  <Wrapper>
    <LogoBox>
      <Logo isLoading />
    </LogoBox>
  </Wrapper>
);
