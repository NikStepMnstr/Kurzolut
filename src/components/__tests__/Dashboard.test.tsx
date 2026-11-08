import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockRates } from '../../test/fixtures.ts';
import { renderWithProviders } from '../../test/testUtils.tsx';
import { Dashboard } from '../Dashboard.tsx';

const data = { date: '6 Nov 2026', rates: mockRates };

describe('Dashboard', () => {
  it('shows the date, the rates and the conversion to EUR', () => {
    renderWithProviders(<Dashboard data={data} />);

    expect(screen.getByText('Rates for 6 Nov 2026')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByLabelText('Result in EUR')).toHaveTextContent(
      '41.08 EUR',
    );
  });

  it('converts with the tile the user selects', async () => {
    renderWithProviders(<Dashboard data={data} />);

    await userEvent.click(screen.getByRole('button', { name: /HUF/ }));

    expect(screen.getByLabelText('Result in HUF')).toHaveTextContent(
      '14,940.98 HUF',
    );
  });

  it('filters the tiles by the search', async () => {
    renderWithProviders(<Dashboard data={data} />);

    await userEvent.type(screen.getByLabelText('Search currencies'), 'hungary');

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
    expect(screen.getByRole('button', { name: /HUF/ })).toBeInTheDocument();
  });

  it('says so when the search matches nothing', async () => {
    renderWithProviders(<Dashboard data={data} />);

    await userEvent.type(screen.getByLabelText('Search currencies'), 'zzz');

    expect(
      await screen.findByText('No currency matches "zzz".'),
    ).toBeInTheDocument();
  });

  it('keeps converting when the search hides the selected tile', async () => {
    renderWithProviders(<Dashboard data={data} />);

    await userEvent.type(screen.getByLabelText('Search currencies'), 'usd');

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
    expect(screen.getByLabelText('Result in EUR')).toHaveTextContent(
      '41.08 EUR',
    );
  });
});
