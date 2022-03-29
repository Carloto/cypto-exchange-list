import Image from 'next/image';
import styled from 'styled-components';

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  list-style: none;
  padding: 0;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.li`
  padding: 15px;
  background-color: gainsboro;
  border-radius: 8px;
  display: flex;
  flex-flow: column wrap;
  gap: 15px;

  .title {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    min-height: 50px;
  }

  .info {
    list-style: none;
    padding: 0;

    .value {
      font-weight: 600;
    }
  }
`;

export function ExchangesList({ exchanges }: { exchanges: any }) {
  return (
    <List>
      {exchanges.map((exchange: any) => (
        <Item key={exchange.id}>
          <a
            className='title'
            href={exchange.url}
            target='_blank'
            rel='noreferrer'
          >
            {exchange.image && (
              <Image
                src={exchange.image}
                alt={exchange.name}
                width={50}
                height={50}
              />
            )}
            {exchange.name}
          </a>
          <ul className='info'>
            <li>
              Year Established:{' '}
              <span className='value'>{exchange.year_established}</span>
            </li>
            <li>
              Country: <span className='value'>{exchange.country}</span>
            </li>
            <li>
              Trust Score: <span className='value'>{exchange.trust_score}</span>
            </li>
            <li>
              Trade Volume 24h:{' '}
              <span className='value'>{exchange.trade_volume_24h_btc}</span>
            </li>
          </ul>
        </Item>
      ))}
    </List>
  );
}
