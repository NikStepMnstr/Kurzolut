import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../test/testUtils.tsx';
import { ErrorMessage } from '../ErrorMessage.tsx';

describe('ErrorMessage', () => {
  it('retries when the button is clicked', async () => {
    const onRetry = vi.fn();
    renderWithProviders(<ErrorMessage isRetrying={false} onRetry={onRetry} />);

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('disables the button while retrying', () => {
    renderWithProviders(<ErrorMessage isRetrying onRetry={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Trying again…' }),
    ).toBeDisabled();
  });
});
