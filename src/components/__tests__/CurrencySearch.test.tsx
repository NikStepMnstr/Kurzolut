import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../test/testUtils.tsx';
import { CurrencySearch } from '../CurrencySearch.tsx';

describe('CurrencySearch', () => {
  it('shows the current value', () => {
    renderWithProviders(<CurrencySearch value="euro" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Search currencies')).toHaveValue('euro');
  });

  it('reports what the user types', async () => {
    const onChange = vi.fn();
    renderWithProviders(<CurrencySearch value="" onChange={onChange} />);

    await userEvent.type(screen.getByLabelText('Search currencies'), 'e');

    expect(onChange).toHaveBeenCalledWith('e');
  });
});
