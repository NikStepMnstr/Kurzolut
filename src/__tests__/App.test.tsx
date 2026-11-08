import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from '../App.tsx';
import { mockRatesText } from '../test/fixtures.ts';
import { renderWithProviders, stubFetch } from '../test/testUtils.tsx';

const errorText =
  "We couldn't load the exchange rates from the Czech National Bank.";

describe('App', () => {
  it('shows only the loader until the rates arrive', async () => {
    stubFetch({ text: mockRatesText });
    const { container } = renderWithProviders(<App />);

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.queryByText('Kurzolut')).not.toBeInTheDocument();

    expect(await screen.findByText('Kurzolut')).toBeInTheDocument();
    expect(screen.getByText('Rates for 6 Nov 2026')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('requests rates without reusing the browser cache', async () => {
    const fetchMock = stubFetch({ text: mockRatesText });
    renderWithProviders(<App />);

    await screen.findByText('Kurzolut');

    expect(fetchMock).toHaveBeenCalledWith('/api/cnb', { cache: 'no-cache' });
  });

  it('shows an error when the server responds with a failure', async () => {
    stubFetch({ status: 500, text: mockRatesText });
    renderWithProviders(<App />);

    expect(await screen.findByText(errorText)).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('shows an error when the response is not in the CNB format', async () => {
    stubFetch({ text: '<html>Maintenance</html>' });
    renderWithProviders(<App />);

    expect(await screen.findByText(errorText)).toBeInTheDocument();
  });

  it('keeps the error visible while retrying', async () => {
    const fetchMock = stubFetch({ status: 500 });
    fetchMock.mockReturnValueOnce(new Promise<Response>(() => {}));
    renderWithProviders(<App />);

    const retryButton = await screen.findByRole('button', {
      name: 'Try again',
    });
    await userEvent.click(retryButton);

    expect(screen.getByText(errorText)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Trying again…' }),
    ).toBeDisabled();
  });

  it('shows the rates after a successful retry', async () => {
    stubFetch({ status: 500 }, { text: mockRatesText });
    renderWithProviders(<App />);

    const retryButton = await screen.findByRole('button', {
      name: 'Try again',
    });
    await userEvent.click(retryButton);

    expect(await screen.findByRole('list')).toBeInTheDocument();
    expect(screen.queryByText(errorText)).not.toBeInTheDocument();
  });

  it('lets the user retry again after a failed retry', async () => {
    stubFetch({ status: 500 }, { status: 500 });
    renderWithProviders(<App />);

    const retryButton = await screen.findByRole('button', {
      name: 'Try again',
    });
    await userEvent.click(retryButton);

    expect(
      await screen.findByRole('button', { name: 'Try again' }),
    ).toBeEnabled();
  });
});
