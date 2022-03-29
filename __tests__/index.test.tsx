import { fireEvent, render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://api.coingecko.com/api/v3/exchanges', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') as '1' | '2';

    const exchanges = {
      '1': [
        { id: 'binance', name: 'Binance' },
        { id: 'kucoin', name: 'KuCoin' },
      ],
      '2': [{ id: 'traderjoe', name: 'Trader Joe' }],
    };

    return res(ctx.json(exchanges[page]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  it('renders the page', () => {
    render(<Home />);
  });

  it('fetches and displays exchanges list', async () => {
    render(<Home />);

    await screen.findByText('Binance');
    await screen.findByText('KuCoin');
  });

  it('should go to the next page', async () => {
    render(<Home />);

    await screen.findByText('Binance');

    const nextButton = await screen.findByText('Next page');
    fireEvent.click(nextButton);

    await screen.findByText('Trader Joe');
    const binance = screen.queryByText('Binance');
    expect(binance).not.toBeInTheDocument();
  });

  it('should go to the previous page', async () => {
    render(<Home />);

    const nextButton = await screen.findByText('Next page');
    fireEvent.click(nextButton);

    await screen.findByText('Trader Joe');

    const prevButton = await screen.findByText('Previous page');
    fireEvent.click(prevButton);

    await screen.findByText('Binance');
    const traderJoe = screen.queryByText('Trader Joe');
    expect(traderJoe).not.toBeInTheDocument();
  });

  it('should filter by name', async () => {
    render(<Home />);

    await screen.findByText('Binance');
    await screen.findByText('KuCoin');

    const searchInput = await screen.findByLabelText(/filter/i);
    fireEvent.change(searchInput, { target: { value: 'bina' } });

    screen.getByText('Binance');
    expect(screen.queryByText('KuCoin')).not.toBeInTheDocument();
  });
});
