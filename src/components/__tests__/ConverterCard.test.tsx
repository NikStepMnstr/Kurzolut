import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockRates } from '../../test/fixtures.ts';
import { renderWithProviders } from '../../test/testUtils.tsx';
import { ConverterCard } from '../ConverterCard.tsx';

const [eur, huf] = mockRates;

describe('ConverterCard', () => {
  it('converts the default amount of 1000 CZK', () => {
    renderWithProviders(<ConverterCard selectedRate={eur} />);

    expect(screen.getByLabelText('Amount in CZK')).toHaveValue('1000');
    expect(screen.getByLabelText('Result in EUR')).toHaveTextContent(
      '41.08 EUR',
    );
  });

  it('accounts for the unit amount of the rate', () => {
    renderWithProviders(<ConverterCard selectedRate={huf} />);

    expect(screen.getByText('14,940.98')).toBeInTheDocument();
    expect(screen.getByText('100 HUF = 6.693 CZK')).toBeInTheDocument();
  });

  it('converts a typed amount with a decimal comma', async () => {
    renderWithProviders(<ConverterCard selectedRate={eur} />);

    const amountInput = screen.getByLabelText('Amount in CZK');
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '2434,5');

    expect(await screen.findByText('100.00')).toBeInTheDocument();
  });

  it('reads 1,000 as one', async () => {
    renderWithProviders(<ConverterCard selectedRate={eur} />);

    const amountInput = screen.getByLabelText('Amount in CZK');
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '1,000');

    expect(await screen.findByText('0.04')).toBeInTheDocument();
  });

  it('ignores anything that is not a number', async () => {
    renderWithProviders(<ConverterCard selectedRate={eur} />);

    const amountInput = screen.getByLabelText('Amount in CZK');
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '1a2 -e3');

    expect(amountInput).toHaveValue('123');
  });

  it('allows only one decimal separator', async () => {
    renderWithProviders(<ConverterCard selectedRate={eur} />);

    const amountInput = screen.getByLabelText('Amount in CZK');
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '1.2,3.4');

    expect(amountInput).toHaveValue('1.234');
  });

  it('shows a dash when the amount is empty', async () => {
    renderWithProviders(<ConverterCard selectedRate={eur} />);

    await userEvent.clear(screen.getByLabelText('Amount in CZK'));

    expect(await screen.findByText('–')).toBeInTheDocument();
  });
});
