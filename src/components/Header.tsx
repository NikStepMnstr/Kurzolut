import styled from 'styled-components';

import { fadeIn } from '../styles/animations.ts';
import { Logo } from './Logo.tsx';

const Container = styled.header`
  ${fadeIn}
  grid-area: header;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.m};
  min-height: ${({ theme }) => theme.controlHeight};
`;

const LogoSlot = styled.div`
  flex: none;
  width: 36px;
  height: 36px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.heading};
  font-weight: 700;
`;

export const Header = () => (
  <Container>
    <LogoSlot>
      <Logo />
    </LogoSlot>
    <Title>Kurzolut</Title>
  </Container>
);
