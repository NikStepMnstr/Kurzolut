import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockRates } from '../../test/fixtures.ts';
import { renderWithProviders } from '../../test/testUtils.tsx';
import { RateGrid } from '../RateGrid.tsx';

describe('RateGrid', () => {
  it('shows a tile for every rate', () => {
    renderWithProviders(
      <RateGrid
        rates={mockRates}
        selectedCode="EUR"
        query=""
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('marks only the selected tile', () => {
    renderWithProviders(
      <RateGrid
        rates={mockRates}
        selectedCode="HUF"
        query=""
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { pressed: true })).toHaveTextContent(
      'HUF',
    );
  });

  it('reports the code of the clicked tile', async () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <RateGrid
        rates={mockRates}
        selectedCode="EUR"
        query=""
        onSelect={onSelect}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /USD/ }));

    expect(onSelect).toHaveBeenCalledWith('USD');
  });

  it('shows the trimmed query when there are no rates', () => {
    renderWithProviders(
      <RateGrid
        rates={[]}
        selectedCode="EUR"
        query="  zzz "
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText('No currency matches "zzz".')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
