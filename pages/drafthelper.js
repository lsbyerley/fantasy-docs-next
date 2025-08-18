import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { api } from '../services/api';
import targets from './targets';
import classNames from 'classnames';
import { useIntervalWhen } from "rooks";

// Season key can be found in a mock draft looking at the network tab
// 2024 - 449 season key
// 2025 - 461 season key

// TITANS LEAGUE
const TITANS_2019 = '390.l.887953';
const TITANS_2023 = '423.l.234495';
const TITANS_2024 = '449.l.473600';
const TITANS_2025 = '461.l.926364';

// LADS LEAGUE
const LADS_2024 = '449.l.767057';
const LADS_2025 = '461.l.247994';

const MOCK_DRAFT = '449.l.9877371'
const LEAGUE_KEY = TITANS_2025;

export const getServerSideProps = async (context) => {
  let players;
  try {
    players = await import(`../assets/player-data/players-${TITANS_2025}.json`);
  } catch (err) {
    console.error('LOG: error importing players json file');
  }

  console.log('LOG: CONTEXT', context);

  const { query } = context;
  const { league } = query;

  return {
    props: {
      players: players?.data || [],
      urlQueryLeagueKey: league || null,
    },
  };
};

// justin jefferson 449.p.32692 2024 player key

const getPlayerFromKey = (playerKey) => {
  return players.find((p) => p.player_key === playerKey);
};

export default function Main({ players, urlQueryLeagueKey }) {
  const leagueKey = urlQueryLeagueKey || LEAGUE_KEY;


  const [draftResults, setDraftResults] = useState([]);
  const [draftStatus, setDraftStatus] = useState();
  const [leagueName, setLeagueName] = useState('');

  const fetchResults = async () => {
    const data = await api('/league/draft_results', {
      leagueKey,
    });
    console.log('LOG: draftResults data', data);

    const reversedResults = data?.draft_results?.reverse()

    setLeagueName(data?.name);
    setDraftStatus(data?.draft_status);
    setDraftResults(reversedResults);
  };

  useEffect(() => {
    if (!draftResults?.length) {
      console.log('LOG: initialFetchResults');
      fetchResults();
    }
  }, []);

  useIntervalWhen(
    () => {
      console.log('LOG: in draft updating draft results');
      fetchResults();
    },
    15000,
    draftStatus === 'draft',
  );

  useIntervalWhen(
    () => {
      console.log('LOG: predraft updating draft results');
      fetchResults();
    },
    30000,
    draftStatus === 'predraft',
  );

  const buildTargetMarkup = (roundTargets, draftResults) => {
    return (
      <div>
        {roundTargets.map((t) => {
          const istaken = draftResults?.find((dr) => {
            if (!dr?.player_key) return;
            const player = getPlayerFromKey(dr?.player_key, players);
            return player?.name?.trim().toLowerCase() === t.toLowerCase();
          });

          const targetClassNames = classNames({
            relative: true,
            'text-green-700': !istaken,
            'text-red-500': istaken,
            'line-through': istaken,
          });

          return (
            <p key={t} className={targetClassNames}>
              {t}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Yahoo! Draft Helper</title>
      </Head>

      <p>{leagueName}</p>

      <div className='flex'>
        <div className='w-1/2'>
          <h3>Targets</h3>
          {Object.keys(targets).map((key) => {
            const roundTargets = targets[key];
            const targetsMarkup = buildTargetMarkup(roundTargets, draftResults);
            return (
              <div className='mb-4' key={key}>
                <p className='mb-1 underline font-medium'>Round {key}</p>
                {targetsMarkup}
              </div>
            );
          })}
        </div>
        <div className='w-1/2'>
          <h3>Results</h3>
          <div>
            {draftResults?.map((r) => {
              if (!r.player_key) return;
              const player = getPlayerFromKey(r?.player_key, players);
              return (
                <div className='flex space-between' key={r?.player_key}>
                  <p className='mr-2'>({r?.round})</p>
                  <p className='mr-2'>{r?.pick}</p>
                  <p className='font-bold'>{player?.name || r?.player_key}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
