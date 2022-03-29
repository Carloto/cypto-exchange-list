import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExchangesList } from '../components';
import { getExchanges } from '../services';

const Nav = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

type ButtonProps = {
  visible?: boolean;
};

const Button = styled.span<ButtonProps>`
  border: 2px solid gainsboro;
  color: gainsboro;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  visibility: ${(props) =>
    props.visible === true || props.visible === undefined
      ? 'visible'
      : 'hidden'};

  &:hover {
    border-color: #000;
    color: #000;
  }
`;

const Search = styled.input`
  margin-bottom: 25px;
  border-radius: 8px;
  padding: 5px 10px;
`;

export default function Home() {
  const [page, setPage] = useState(1);
  const [exchanges, setExchanges] = useState([]);
  const [filteredExchanges, setFilteredExchanges] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const exchanges = await getExchanges(100, page);
      if (isMounted) setExchanges(exchanges);
    })();

    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    if (exchanges) {
      setFilteredExchanges(
        exchanges.filter((item: any) =>
          item.id.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setFilteredExchanges([]);
    }
  }, [exchanges, filterText]);

  function prevPage() {
    if (page > 1) setPage(page - 1);
  }

  function nextPage() {
    setPage(page + 1);
  }

  return (
    <div>
      <Head>
        <title>Crypto Exchanges List</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Crypto Exchanges List</h1>
        <Search
          placeholder='Search by name'
          aria-label='Filter'
          onChange={(e: any) => setFilterText(e.target.value)}
        />
        <div>
          <Nav>
            <Button
              className='prev'
              visible={page > 1 ? true : false}
              onClick={prevPage}
            >
              Previous page
            </Button>
            <Button className='next' onClick={nextPage}>
              Next page
            </Button>
          </Nav>
          <ExchangesList exchanges={filteredExchanges} />
        </div>
      </main>
    </div>
  );
}
