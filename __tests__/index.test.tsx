import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://api.coingecko.com/api/v3/exchanges', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') as '1' | '2';

    const exchanges = { '1': [{ id: 'binance' }, { id: 'kucoin' }], '2': {} };

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

    await screen.findByText('binance');
    await screen.findByText('kucoin');
  });

  // it('renders a heading', () => {
  //   render(<Home />);

  //   const heading = screen.getByRole('heading', {
  //     name: /welcome to next\.js!/i,
  //   });

  //   expect(heading).toBeInTheDocument();
  // });
});
