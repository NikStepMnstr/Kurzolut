import styled from 'styled-components';

import { fadeIn } from '../styles/animations.ts';

const Container = styled.p`
  ${fadeIn}
  grid-area: notice;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.small};

  @media (min-width: ${({ theme }) => theme.breakpoint.desktop}) {
    align-self: center;
    text-align: right;
  }
`;

type NoticeProps = {
  date: string;
};

export const Notice = ({ date }: NoticeProps) => (
  <Container>Rates for {date}</Container>
);
