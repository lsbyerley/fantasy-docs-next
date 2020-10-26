import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const LeagueDraftResults = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [leagueKey, setLeagueKey] = useState(null);
  const [leagueKeyError, setLeagueKeyError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === leagueKey) {
      return setLeagueKeyError(true);
    } else {
      setLeagueKeyError(false);
    }

    setLoading(true);

    const data = await api("/league/draft_results", {
      leagueKey,
    });

    setResponse(data);
  };

  useEffect(() => {
    if (response) {
      setLoading(false);
    }
  }, [response]);

  const updateInput = (cb, val) => {
    return cb(val);
  };

  return (
    <>
      <h2 className={cx(appStyles.public, appStyles.private)}>
        league.draft_results
      </h2>
      <p>
        Retrieve draft results from a specific league. Users must be
        authenticated and a member of the league to query against private
        leagues.
      </p>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div>
        <h3>{activeTab === "description" ? "Arguments" : "Try It Out"}</h3>
        <form onSubmit={(e) => makeAPICall(e)}>
          <div className={appStyles.table}>
            <div className={cx(appStyles.header, appStyles.row)}>
              <div>Argument</div>
              {activeTab === "tester" && <div>Value</div>}
              <div>Description</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.required)}>
                league_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: leagueKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setLeagueKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The key for the league you'd like to query. League key format:{" "}
                {`{game_key}.l.{league_id}`}
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {leagueKeyError && (
                <div className={appStyles.err}>
                  Please enter a value for all required fields
                </div>
              )}
              <button
                onClick={makeAPICall}
                className={appStyles.button}
                type="submit"
              >
                {loading ? (
                  <div className={appStyles.spinner}>
                    <div className={appStyles.bounce1}></div>
                    <div className={appStyles.bounce2}></div>
                    <div className={appStyles.bounce3}></div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          )}
        </form>

        {response && activeTab === "tester" && <CodeBlock code={response} />}

        {activeTab === "description" && (
          <>
            <div>
              <h3>How to use</h3>
              <CodeBlock>{`const YahooFantasy = require('yahoo-fantasy');
const yf = new YahooFantasy(
  Y!APPLICATION_KEY,
  Y!APPLICATION_SECRET,
  tokenCallbackFn, // optional
  redirectUri // optional
);

yf.setUserToken(
  Y!OAuthAccessToken
);

// promise based
try {
  const draft_results = yf.league.draft_results(league_key);
} catch (e) {
  // handle error
}

// callback based
yf.league.draft_results(league_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    league_key: "328.l.34014",
                    league_id: "34014",
                    name: "Freddy Beach Baseball",
                    url: "http://baseball.fantasysports.yahoo.com/b1/34014",
                    draft_status: "postdraft",
                    num_teams: 12,
                    edit_key: "2014-11-13",
                    weekly_deadline: "intraday",
                    league_update_timestamp: "1411979069",
                    scoring_type: "head",
                    league_type: "private",
                    renew: "308_51222",
                    renewed: "",
                    short_invitation_url:
                      "https://yho.com/mlb?l=34014&k=0a2bf56970bb200c",
                    is_pro_league: "0",
                    current_week: "25",
                    start_week: "1",
                    start_date: "2014-03-22",
                    end_week: "25",
                    end_date: "2014-09-28",
                    is_finished: 1,
                    draft_results: [
                      {
                        pick: 1,
                        round: 1,
                        cost: "50",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.8180",
                      },
                      {
                        pick: 2,
                        round: 1,
                        cost: "51",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.7488",
                      },
                      {
                        pick: 3,
                        round: 1,
                        cost: "38",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.8562",
                      },
                      {
                        pick: 4,
                        round: 1,
                        cost: "41",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.7497",
                      },
                      {
                        pick: 5,
                        round: 1,
                        cost: "35",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.7487",
                      },
                      {
                        pick: 6,
                        round: 1,
                        cost: "31",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7382",
                      },
                      {
                        pick: 7,
                        round: 1,
                        cost: "46",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.7278",
                      },
                      {
                        pick: 8,
                        round: 1,
                        cost: "72",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.8861",
                      },
                      {
                        pick: 9,
                        round: 1,
                        cost: "60",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.8034",
                      },
                      {
                        pick: 10,
                        round: 1,
                        cost: "43",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.7912",
                      },
                      {
                        pick: 11,
                        round: 1,
                        cost: "34",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.7254",
                      },
                      {
                        pick: 12,
                        round: 1,
                        cost: "5",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.8759",
                      },
                      {
                        pick: 13,
                        round: 2,
                        cost: "47",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.7290",
                      },
                      {
                        pick: 14,
                        round: 2,
                        cost: "20",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8401",
                      },
                      {
                        pick: 15,
                        round: 2,
                        cost: "33",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7590",
                      },
                      {
                        pick: 16,
                        round: 2,
                        cost: "38",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.7914",
                      },
                      {
                        pick: 17,
                        round: 2,
                        cost: "15",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.9642",
                      },
                      {
                        pick: 18,
                        round: 2,
                        cost: "42",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.7946",
                      },
                      {
                        pick: 19,
                        round: 2,
                        cost: "37",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.7812",
                      },
                      {
                        pick: 20,
                        round: 2,
                        cost: "23",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.7257",
                      },
                      {
                        pick: 21,
                        round: 2,
                        cost: "12",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.8622",
                      },
                      {
                        pick: 22,
                        round: 2,
                        cost: "39",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.8634",
                      },
                      {
                        pick: 23,
                        round: 2,
                        cost: "30",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8080",
                      },
                      {
                        pick: 24,
                        round: 2,
                        cost: "12",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.9422",
                      },
                      {
                        pick: 25,
                        round: 3,
                        cost: "26",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.8175",
                      },
                      {
                        pick: 26,
                        round: 3,
                        cost: "29",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.7062",
                      },
                      {
                        pick: 27,
                        round: 3,
                        cost: "33",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7780",
                      },
                      {
                        pick: 28,
                        round: 3,
                        cost: "25",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.7490",
                      },
                      {
                        pick: 29,
                        round: 3,
                        cost: "22",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.9540",
                      },
                      {
                        pick: 30,
                        round: 3,
                        cost: "41",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.8658",
                      },
                      {
                        pick: 31,
                        round: 3,
                        cost: "26",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.9128",
                      },
                      {
                        pick: 32,
                        round: 3,
                        cost: "27",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7026",
                      },
                      {
                        pick: 33,
                        round: 3,
                        cost: "25",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.6679",
                      },
                      {
                        pick: 34,
                        round: 3,
                        cost: "32",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8590",
                      },
                      {
                        pick: 35,
                        round: 3,
                        cost: "13",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.6132",
                      },
                      {
                        pick: 36,
                        round: 3,
                        cost: "15",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.8172",
                      },
                      {
                        pick: 37,
                        round: 4,
                        cost: "26",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.8857",
                      },
                      {
                        pick: 38,
                        round: 4,
                        cost: "26",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.8179",
                      },
                      {
                        pick: 39,
                        round: 4,
                        cost: "18",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.8619",
                      },
                      {
                        pick: 40,
                        round: 4,
                        cost: "21",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.7627",
                      },
                      {
                        pick: 41,
                        round: 4,
                        cost: "11",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8616",
                      },
                      {
                        pick: 42,
                        round: 4,
                        cost: "27",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.8621",
                      },
                      {
                        pick: 43,
                        round: 4,
                        cost: "27",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.8649",
                      },
                      {
                        pick: 44,
                        round: 4,
                        cost: "29",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.6619",
                      },
                      {
                        pick: 45,
                        round: 4,
                        cost: "28",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7054",
                      },
                      {
                        pick: 46,
                        round: 4,
                        cost: "31",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8171",
                      },
                      {
                        pick: 47,
                        round: 4,
                        cost: "15",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7345",
                      },
                      {
                        pick: 48,
                        round: 4,
                        cost: "7",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8394",
                      },
                      {
                        pick: 49,
                        round: 5,
                        cost: "11",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.6853",
                      },
                      {
                        pick: 50,
                        round: 5,
                        cost: "25",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.7495",
                      },
                      {
                        pick: 51,
                        round: 5,
                        cost: "11",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8611",
                      },
                      {
                        pick: 52,
                        round: 5,
                        cost: "5",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.8609",
                      },
                      {
                        pick: 53,
                        round: 5,
                        cost: "16",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.7829",
                      },
                      {
                        pick: 54,
                        round: 5,
                        cost: "15",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8645",
                      },
                      {
                        pick: 55,
                        round: 5,
                        cost: "25",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.7311",
                      },
                      {
                        pick: 56,
                        round: 5,
                        cost: "16",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.7701",
                      },
                      {
                        pick: 57,
                        round: 5,
                        cost: "15",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.8529",
                      },
                      {
                        pick: 58,
                        round: 5,
                        cost: "8",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.6603",
                      },
                      {
                        pick: 59,
                        round: 5,
                        cost: "10",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.7634",
                      },
                      {
                        pick: 60,
                        round: 5,
                        cost: "10",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.9107",
                      },
                      {
                        pick: 61,
                        round: 6,
                        cost: "27",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.8400",
                      },
                      {
                        pick: 62,
                        round: 6,
                        cost: "13",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.7509",
                      },
                      {
                        pick: 63,
                        round: 6,
                        cost: "14",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8873",
                      },
                      {
                        pick: 64,
                        round: 6,
                        cost: "6",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8723",
                      },
                      {
                        pick: 65,
                        round: 6,
                        cost: "7",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.6314",
                      },
                      {
                        pick: 66,
                        round: 6,
                        cost: "2",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.8287",
                      },
                      {
                        pick: 67,
                        round: 6,
                        cost: "10",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.8412",
                      },
                      {
                        pick: 68,
                        round: 6,
                        cost: "4",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.6205",
                      },
                      {
                        pick: 69,
                        round: 6,
                        cost: "12",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8996",
                      },
                      {
                        pick: 70,
                        round: 6,
                        cost: "29",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.7779",
                      },
                      {
                        pick: 71,
                        round: 6,
                        cost: "5",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.9191",
                      },
                      {
                        pick: 72,
                        round: 6,
                        cost: "10",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.9240",
                      },
                      {
                        pick: 73,
                        round: 7,
                        cost: "15",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.8874",
                      },
                      {
                        pick: 74,
                        round: 7,
                        cost: "17",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.7708",
                      },
                      {
                        pick: 75,
                        round: 7,
                        cost: "17",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.7907",
                      },
                      {
                        pick: 76,
                        round: 7,
                        cost: "5",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.9108",
                      },
                      {
                        pick: 77,
                        round: 7,
                        cost: "8",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.9124",
                      },
                      {
                        pick: 78,
                        round: 7,
                        cost: "11",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.8281",
                      },
                      {
                        pick: 79,
                        round: 7,
                        cost: "5",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.6466",
                      },
                      {
                        pick: 80,
                        round: 7,
                        cost: "4",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.7104",
                      },
                      {
                        pick: 81,
                        round: 7,
                        cost: "11",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.6857",
                      },
                      {
                        pick: 82,
                        round: 7,
                        cost: "5",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.7455",
                      },
                      {
                        pick: 83,
                        round: 7,
                        cost: "6",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.8167",
                      },
                      {
                        pick: 84,
                        round: 7,
                        cost: "3",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.9126",
                      },
                      {
                        pick: 85,
                        round: 8,
                        cost: "16",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.8430",
                      },
                      {
                        pick: 86,
                        round: 8,
                        cost: "4",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.8699",
                      },
                      {
                        pick: 87,
                        round: 8,
                        cost: "2",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.6419",
                      },
                      {
                        pick: 88,
                        round: 8,
                        cost: "5",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8282",
                      },
                      {
                        pick: 89,
                        round: 8,
                        cost: "5",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.7900",
                      },
                      {
                        pick: 90,
                        round: 8,
                        cost: "10",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.8326",
                      },
                      {
                        pick: 91,
                        round: 8,
                        cost: "16",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.7483",
                      },
                      {
                        pick: 92,
                        round: 8,
                        cost: "6",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.6154",
                      },
                      {
                        pick: 93,
                        round: 8,
                        cost: "5",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.9053",
                      },
                      {
                        pick: 94,
                        round: 8,
                        cost: "6",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.7681",
                      },
                      {
                        pick: 95,
                        round: 8,
                        cost: "5",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.6662",
                      },
                      {
                        pick: 96,
                        round: 8,
                        cost: "6",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.9100",
                      },
                      {
                        pick: 97,
                        round: 9,
                        cost: "9",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.7569",
                      },
                      {
                        pick: 98,
                        round: 9,
                        cost: "4",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.7823",
                      },
                      {
                        pick: 99,
                        round: 9,
                        cost: "3",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.6014",
                      },
                      {
                        pick: 100,
                        round: 9,
                        cost: "13",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.6637",
                      },
                      {
                        pick: 101,
                        round: 9,
                        cost: "3",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.9015",
                      },
                      {
                        pick: 102,
                        round: 9,
                        cost: "16",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.7737",
                      },
                      {
                        pick: 103,
                        round: 9,
                        cost: "11",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.6708",
                      },
                      {
                        pick: 104,
                        round: 9,
                        cost: "2",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7614",
                      },
                      {
                        pick: 105,
                        round: 9,
                        cost: "6",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.7711",
                      },
                      {
                        pick: 106,
                        round: 9,
                        cost: "8",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.7571",
                      },
                      {
                        pick: 107,
                        round: 9,
                        cost: "3",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.8836",
                      },
                      {
                        pick: 108,
                        round: 9,
                        cost: "2",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.9141",
                      },
                      {
                        pick: 109,
                        round: 10,
                        cost: "9",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.9201",
                      },
                      {
                        pick: 110,
                        round: 10,
                        cost: "11",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.7547",
                      },
                      {
                        pick: 111,
                        round: 10,
                        cost: "3",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.7947",
                      },
                      {
                        pick: 112,
                        round: 10,
                        cost: "3",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7283",
                      },
                      {
                        pick: 113,
                        round: 10,
                        cost: "12",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.7981",
                      },
                      {
                        pick: 114,
                        round: 10,
                        cost: "7",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.9048",
                      },
                      {
                        pick: 115,
                        round: 10,
                        cost: "1",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.7748",
                      },
                      {
                        pick: 116,
                        round: 10,
                        cost: "1",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.7825",
                      },
                      {
                        pick: 117,
                        round: 10,
                        cost: "4",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.8289",
                      },
                      {
                        pick: 118,
                        round: 10,
                        cost: "4",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.8795",
                      },
                      {
                        pick: 119,
                        round: 10,
                        cost: "2",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.8599",
                      },
                      {
                        pick: 120,
                        round: 10,
                        cost: "1",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.6765",
                      },
                      {
                        pick: 121,
                        round: 11,
                        cost: "10",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8314",
                      },
                      {
                        pick: 122,
                        round: 11,
                        cost: "1",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8944",
                      },
                      {
                        pick: 123,
                        round: 11,
                        cost: "1",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.7468",
                      },
                      {
                        pick: 124,
                        round: 11,
                        cost: "15",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.8194",
                      },
                      {
                        pick: 125,
                        round: 11,
                        cost: "6",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.9376",
                      },
                      {
                        pick: 126,
                        round: 11,
                        cost: "1",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.7964",
                      },
                      {
                        pick: 127,
                        round: 11,
                        cost: "17",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.9415",
                      },
                      {
                        pick: 128,
                        round: 11,
                        cost: "2",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8057",
                      },
                      {
                        pick: 129,
                        round: 11,
                        cost: "3",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.9094",
                      },
                      {
                        pick: 130,
                        round: 11,
                        cost: "1",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.9248",
                      },
                      {
                        pick: 131,
                        round: 11,
                        cost: "3",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.7835",
                      },
                      {
                        pick: 132,
                        round: 11,
                        cost: "3",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.7072",
                      },
                      {
                        pick: 133,
                        round: 12,
                        cost: "1",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8419",
                      },
                      {
                        pick: 134,
                        round: 12,
                        cost: "14",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.7790",
                      },
                      {
                        pick: 135,
                        round: 12,
                        cost: "1",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.9526",
                      },
                      {
                        pick: 136,
                        round: 12,
                        cost: "1",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.6872",
                      },
                      {
                        pick: 137,
                        round: 12,
                        cost: "2",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.5763",
                      },
                      {
                        pick: 138,
                        round: 12,
                        cost: "14",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.8620",
                      },
                      {
                        pick: 139,
                        round: 12,
                        cost: "9",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.9557",
                      },
                      {
                        pick: 140,
                        round: 12,
                        cost: "4",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.7926",
                      },
                      {
                        pick: 141,
                        round: 12,
                        cost: "3",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.6870",
                      },
                      {
                        pick: 142,
                        round: 12,
                        cost: "10",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.8395",
                      },
                      {
                        pick: 143,
                        round: 12,
                        cost: "1",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.8651",
                      },
                      {
                        pick: 144,
                        round: 12,
                        cost: "13",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8329",
                      },
                      {
                        pick: 145,
                        round: 13,
                        cost: "4",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.8082",
                      },
                      {
                        pick: 146,
                        round: 13,
                        cost: "4",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.7669",
                      },
                      {
                        pick: 147,
                        round: 13,
                        cost: "4",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.7172",
                      },
                      {
                        pick: 148,
                        round: 13,
                        cost: "2",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.9105",
                      },
                      {
                        pick: 149,
                        round: 13,
                        cost: "2",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.8200",
                      },
                      {
                        pick: 150,
                        round: 13,
                        cost: "2",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.7828",
                      },
                      {
                        pick: 151,
                        round: 13,
                        cost: "5",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.8728",
                      },
                      {
                        pick: 152,
                        round: 13,
                        cost: "1",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.7281",
                      },
                      {
                        pick: 153,
                        round: 13,
                        cost: "5",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.9302",
                      },
                      {
                        pick: 154,
                        round: 13,
                        cost: "3",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.9339",
                      },
                      {
                        pick: 155,
                        round: 13,
                        cost: "8",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.8411",
                      },
                      {
                        pick: 156,
                        round: 13,
                        cost: "4",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.9245",
                      },
                      {
                        pick: 157,
                        round: 14,
                        cost: "1",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.7754",
                      },
                      {
                        pick: 158,
                        round: 14,
                        cost: "2",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.9558",
                      },
                      {
                        pick: 159,
                        round: 14,
                        cost: "1",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.9168",
                      },
                      {
                        pick: 160,
                        round: 14,
                        cost: "3",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.8685",
                      },
                      {
                        pick: 161,
                        round: 14,
                        cost: "1",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.7720",
                      },
                      {
                        pick: 162,
                        round: 14,
                        cost: "11",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.7865",
                      },
                      {
                        pick: 163,
                        round: 14,
                        cost: "8",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.9356",
                      },
                      {
                        pick: 164,
                        round: 14,
                        cost: "5",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.9542",
                      },
                      {
                        pick: 165,
                        round: 14,
                        cost: "3",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.8984",
                      },
                      {
                        pick: 166,
                        round: 14,
                        cost: "1",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.9109",
                      },
                      {
                        pick: 167,
                        round: 14,
                        cost: "2",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.8099",
                      },
                      {
                        pick: 168,
                        round: 14,
                        cost: "1",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.9567",
                      },
                      {
                        pick: 169,
                        round: 15,
                        cost: "3",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.6751",
                      },
                      {
                        pick: 170,
                        round: 15,
                        cost: "2",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.9140",
                      },
                      {
                        pick: 171,
                        round: 15,
                        cost: "2",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8635",
                      },
                      {
                        pick: 172,
                        round: 15,
                        cost: "1",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.9516",
                      },
                      {
                        pick: 173,
                        round: 15,
                        cost: "1",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.7292",
                      },
                      {
                        pick: 174,
                        round: 15,
                        cost: "1",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8687",
                      },
                      {
                        pick: 175,
                        round: 15,
                        cost: "1",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.9351",
                      },
                      {
                        pick: 176,
                        round: 15,
                        cost: "2",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.9007",
                      },
                      {
                        pick: 177,
                        round: 15,
                        cost: "2",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.9327",
                      },
                      {
                        pick: 178,
                        round: 15,
                        cost: "1",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.9505",
                      },
                      {
                        pick: 179,
                        round: 15,
                        cost: "1",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.7558",
                      },
                      {
                        pick: 180,
                        round: 15,
                        cost: "1",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.9176",
                      },
                      {
                        pick: 181,
                        round: 16,
                        cost: "1",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.8090",
                      },
                      {
                        pick: 182,
                        round: 16,
                        cost: "3",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.9459",
                      },
                      {
                        pick: 183,
                        round: 16,
                        cost: "4",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.7944",
                      },
                      {
                        pick: 184,
                        round: 16,
                        cost: "22",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.7048",
                      },
                      {
                        pick: 185,
                        round: 16,
                        cost: "1",
                        team_key: "328.l.34014.t.5",
                        player_key: "328.p.9319",
                      },
                      {
                        pick: 186,
                        round: 16,
                        cost: "6",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.9112",
                      },
                      {
                        pick: 187,
                        round: 16,
                        cost: "13",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.8868",
                      },
                      {
                        pick: 188,
                        round: 16,
                        cost: "3",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.8953",
                      },
                      {
                        pick: 189,
                        round: 16,
                        cost: "13",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.7498",
                      },
                      {
                        pick: 190,
                        round: 16,
                        cost: "34",
                        team_key: "328.l.34014.t.10",
                        player_key: "328.p.7264",
                      },
                      {
                        pick: 191,
                        round: 16,
                        cost: "7",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.8554",
                      },
                      {
                        pick: 192,
                        round: 16,
                        cost: "1",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.8773",
                      },
                      {
                        pick: 193,
                        round: 17,
                        cost: "3",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.6983",
                      },
                      {
                        pick: 194,
                        round: 17,
                        cost: "36",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.7066",
                      },
                      {
                        pick: 195,
                        round: 17,
                        cost: "50",
                        team_key: "328.l.34014.t.1",
                        player_key: "328.p.7163",
                      },
                      {
                        pick: 196,
                        round: 17,
                        cost: "1",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.8846",
                      },
                      {
                        pick: 197,
                        round: 17,
                        cost: "3",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.8918",
                      },
                      {
                        pick: 198,
                        round: 17,
                        cost: "3",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.9121",
                      },
                      {
                        pick: 199,
                        round: 17,
                        cost: "23",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.8853",
                      },
                      {
                        pick: 200,
                        round: 17,
                        cost: "9",
                        team_key: "328.l.34014.t.4",
                        player_key: "328.p.8023",
                      },
                      {
                        pick: 201,
                        round: 17,
                        cost: "3",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.8627",
                      },
                      {
                        pick: 202,
                        round: 17,
                        cost: "1",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.8758",
                      },
                      {
                        pick: 203,
                        round: 17,
                        cost: "12",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.8589",
                      },
                      {
                        pick: 204,
                        round: 17,
                        cost: "33",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.6039",
                      },
                      {
                        pick: 205,
                        round: 18,
                        cost: "41",
                        team_key: "328.l.34014.t.8",
                        player_key: "328.p.7977",
                      },
                      {
                        pick: 206,
                        round: 18,
                        cost: "3",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.9321",
                      },
                      {
                        pick: 207,
                        round: 18,
                        cost: "3",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.9296",
                      },
                      {
                        pick: 208,
                        round: 18,
                        cost: "3",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.9329",
                      },
                      {
                        pick: 209,
                        round: 18,
                        cost: "6",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.9297",
                      },
                      {
                        pick: 210,
                        round: 18,
                        cost: "13",
                        team_key: "328.l.34014.t.12",
                        player_key: "328.p.5909",
                      },
                      {
                        pick: 211,
                        round: 18,
                        cost: "1",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8871",
                      },
                      {
                        pick: 212,
                        round: 18,
                        cost: "19",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8780",
                      },
                      {
                        pick: 213,
                        round: 18,
                        cost: "16",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8824",
                      },
                      {
                        pick: 214,
                        round: 18,
                        cost: "29",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8578",
                      },
                      {
                        pick: 215,
                        round: 18,
                        cost: "22",
                        team_key: "328.l.34014.t.2",
                        player_key: "328.p.8967",
                      },
                      {
                        pick: 216,
                        round: 18,
                        cost: "3",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.8849",
                      },
                      {
                        pick: 217,
                        round: 19,
                        cost: "3",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.7504",
                      },
                      {
                        pick: 218,
                        round: 19,
                        cost: "1",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.9323",
                      },
                      {
                        pick: 219,
                        round: 19,
                        cost: "6",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.8859",
                      },
                      {
                        pick: 220,
                        round: 19,
                        cost: "43",
                        team_key: "328.l.34014.t.9",
                        player_key: "328.p.8875",
                      },
                      {
                        pick: 221,
                        round: 19,
                        cost: "3",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.9456",
                      },
                      {
                        pick: 222,
                        round: 19,
                        cost: "5",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.8854",
                      },
                      {
                        pick: 223,
                        round: 19,
                        cost: "3",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.9118",
                      },
                      {
                        pick: 224,
                        round: 19,
                        cost: "33",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.7850",
                      },
                      {
                        pick: 225,
                        round: 19,
                        cost: "42",
                        team_key: "328.l.34014.t.7",
                        player_key: "328.p.7934",
                      },
                      {
                        pick: 226,
                        round: 19,
                        cost: "17",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.8193",
                      },
                      {
                        pick: 227,
                        round: 19,
                        cost: "11",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.9111",
                      },
                      {
                        pick: 228,
                        round: 19,
                        cost: "3",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.9113",
                      },
                      {
                        pick: 229,
                        round: 20,
                        cost: "3",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.9341",
                      },
                      {
                        pick: 230,
                        round: 20,
                        cost: "4",
                        team_key: "328.l.34014.t.3",
                        player_key: "328.p.8285",
                      },
                      {
                        pick: 231,
                        round: 20,
                        cost: "3",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.9317",
                      },
                      {
                        pick: 232,
                        round: 20,
                        cost: "26",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.9095",
                      },
                      {
                        pick: 233,
                        round: 20,
                        cost: "3",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.8644",
                      },
                      {
                        pick: 234,
                        round: 20,
                        cost: "1",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.6423",
                      },
                      {
                        pick: 235,
                        round: 20,
                        cost: "3",
                        team_key: "328.l.34014.t.11",
                        player_key: "328.p.9247",
                      },
                      {
                        pick: 236,
                        round: 20,
                        cost: "3",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.8650",
                      },
                      {
                        pick: 237,
                        round: 20,
                        cost: "3",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.9092",
                      },
                      {
                        pick: 238,
                        round: 20,
                        cost: "5",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.8781",
                      },
                      {
                        pick: 239,
                        round: 20,
                        cost: "12",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7963",
                      },
                      {
                        pick: 240,
                        round: 20,
                        cost: "28",
                        team_key: "328.l.34014.t.6",
                        player_key: "328.p.7631",
                      },
                    ],
                  },
                  null,
                  2
                )}
              </CodeBlock>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LeagueDraftResults;
