import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockRates } from '../../test/fixtures.ts';
import { renderWithProviders } from '../../test/testUtils.tsx';
import { RateTile } from '../RateTile.tsx';

const [eur, huf] = mockRates;

describe('RateTile', () => {
  it('shows the code, country, currency and rate', () => {
    renderWithProviders(
      <RateTile rate={eur} isSelected={false} onSelect={vi.fn()} />,
    );

    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('EMU · euro')).toBeInTheDocument();
    expect(screen.getByText('24.345 CZK')).toBeInTheDocument();
  });

  it('shows the unit amount when the rate is not for one unit', () => {
    renderWithProviders(
      <RateTile rate={huf} isSelected={false} onSelect={vi.fn()} />,
    );

    expect(screen.getByText('6.693 CZK per 100')).toBeInTheDocument();
  });

  it('is pressed when selected', () => {
    renderWithProviders(<RateTile rate={eur} isSelected onSelect={vi.fn()} />);

    expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument();
  });

  it('is not pressed when not selected', () => {
    renderWithProviders(
      <RateTile rate={eur} isSelected={false} onSelect={vi.fn()} />,
    );

    expect(screen.getByRole('button', { pressed: false })).toBeInTheDocument();
  });

  it('reports its code when clicked', async () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <RateTile rate={huf} isSelected={false} onSelect={onSelect} />,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onSelect).toHaveBeenCalledWith('HUF');
  });
});
