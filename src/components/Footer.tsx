import styled from 'styled-components';

import { fadeIn } from '../styles/animations.ts';

const Container = styled.footer`
  ${fadeIn}
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.cream};
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const Content = styled.p`
  max-width: ${({ theme }) => theme.contentMaxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.l};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
    padding-inline: ${({ theme }) => theme.space.xxl};
  }
`;

export const Footer = () => (
  <Container>
    <Content>
      The Czech National Bank updates rates every working day at around 2:30
      p.m.
    </Content>
  </Container>
);
