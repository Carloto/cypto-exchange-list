import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getExchanges } from '../services';

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  list-style: none;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.li`
  padding: 10px;
  background-color: gainsboro;
  border-radius: 8px;
  display: flex;
  flex-flow: column wrap;

  & .title {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    min-height: 50px;
  }
`;

export default function Home() {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const exchanges = await getExchanges(100, 1);
      if (isMounted) setExchanges(exchanges);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Crypto Exchanges List</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Crypto Exchanges List</h1>

        <div>
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
              </Item>
            ))}
          </List>
        </div>
      </main>
    </div>
  );
}
