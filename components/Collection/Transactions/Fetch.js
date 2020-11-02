import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const TransactionsFetch = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [transactionKey, setTransactionKey] = useState(null);
  const [transactionKeyError, setTransactionKeyError] = useState(false);

  const [filters, setFilters] = useState({});

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === transactionKey) {
      return setTransactionKeyError(true);
    } else {
      setTransactionKeyError(false);
    }

    setLoading(true);

    const data = await api("/transactions/fetch", {
      transactionKey,
      filters,
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

  const updateFilter = (key, val) => {
    setFilters({
      ...filters,
      [key]: val,
    });
  };

  return (
    <>
      <h2 className={cx(appStyles.public, appStyles.private)}>
        transactions.fetch
      </h2>
      <p>Retrieve information about multiple leagues in a single request.</p>
      <p>
        Users can only retrieve data for private leagues of which they are a
        member if they have provided a valid OAuthToken upon authenticating your
        application. Leagues that have been designated as public can be queried
        without user authentication.
      </p>
      <p>
        <em>
          As I write this I believe... this should maybe be done differently...
        </em>
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
                transaction_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: transactionKeyError,
                    })}
                    type="text"
                    onChange={(e) =>
                      updateInput(setTransactionKey, e.target.value)
                    }
                  ></input>
                </div>
              )}
              <div>
                The key(s) for the transaction(s) you'd like to query.
                Transaction key format:{" "}
                {`{game_key}.l.{league_id}.tr.{transaction_id}`}
              </div>
            </div>
          </div>

          <div className={cx(appStyles.table, appStyles.filters)}>
            <div className={cx(appStyles.header, appStyles.row)}>
              <div>Filters</div>
              {activeTab === "tester" && <div>Value</div>}
              <div>Description</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.filter)}>type</div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) => updateFilter("type", e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                Choose from the following (comma separated for multiple):
                <ul className={appStyles.filterOptions}>
                  <li>add</li>
                  <li>drop</li>
                  <li>commish</li>
                  <li>trade</li>
                  <li>waiver (w/ team_key only)</li>
                  <li>pending_trade (w/ team_key only)</li>
                </ul>
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.filter)}>
                team_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) => updateFilter("team_key", e.target.value)}
                  ></input>
                </div>
              )}
              <div>a team_key within the league</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.filter)}>count</div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) => updateFilter("count", e.target.value)}
                  ></input>
                </div>
              )}
              <div>the number of results to retrieve</div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {transactionKeyError && (
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
  const transactions = yf.transactions.fetch(
    [transaction_keys],
    {filters}, // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.transactions.fetch(
  [transaction_keys], 
  {filters}, // optional
  callbackFn
);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  [
                    {
                      league_key: "328.l.34014",
                      league_id: "34014",
                      name: "Freddy Beach Baseball",
                      url:
                        "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014",
                      league_chat_id: "",
                      draft_status: "postdraft",
                      num_teams: 12,
                      edit_key: "2015-02-04",
                      weekly_deadline: "intraday",
                      league_update_timestamp: "1411979069",
                      scoring_type: "head",
                      league_type: "private",
                      renew: "308_51222",
                      renewed: "346_1106",
                      short_invitation_url:
                        "https://yho.com/mlb?l=34014&k=0a2bf56970bb200c",
                      is_pro_league: "0",
                      current_week: "25",
                      start_week: "1",
                      start_date: "2014-03-22",
                      end_week: "25",
                      end_date: "2014-09-28",
                      is_finished: 1,
                      settings: {
                        draft_type: "live",
                        is_auction_draft: "1",
                        scoring_type: "head",
                        uses_playoff: "1",
                        has_playoff_consolation_games: true,
                        playoff_start_week: "23",
                        uses_playoff_reseeding: 0,
                        uses_lock_eliminated_teams: 0,
                        num_playoff_teams: "8",
                        num_playoff_consolation_teams: 0,
                        uses_roster_import: "1",
                        roster_import_deadline: "2014-03-06",
                        waiver_type: "R",
                        waiver_rule: "all",
                        uses_faab: "0",
                        draft_time: "1395361800",
                        post_draft_players: "W",
                        max_teams: "12",
                        waiver_time: "2",
                        trade_end_date: "2014-08-17",
                        trade_ratify_type: "commish",
                        trade_reject_time: "2",
                        player_pool: "ALL",
                        cant_cut_list: "yahoo",
                        is_publicly_viewable: "1",
                        roster_positions: [
                          { position: "C", position_type: "B", count: 1 },
                          { position: "1B", position_type: "B", count: 1 },
                          { position: "2B", position_type: "B", count: 1 },
                          { position: "3B", position_type: "B", count: 1 },
                          { position: "SS", position_type: "B", count: 1 },
                          { position: "OF", position_type: "B", count: 3 },
                          { position: "Util", position_type: "B", count: 1 },
                          { position: "SP", position_type: "P", count: 4 },
                          { position: "RP", position_type: "P", count: 2 },
                          { position: "BN", count: 5 },
                          { position: "DL", count: "2" },
                        ],
                        stat_categories: [
                          {
                            stat_id: 60,
                            enabled: "1",
                            name: "H/AB",
                            display_name: "H/AB",
                            sort_order: "1",
                            position_type: "B",
                            stat_position_types: [
                              { position_type: "B", is_only_display_stat: "1" },
                            ],
                            is_only_display_stat: "1",
                          },
                          {
                            stat_id: 7,
                            enabled: "1",
                            name: "Runs",
                            display_name: "R",
                            sort_order: "1",
                            position_type: "B",
                            stat_position_types: [{ position_type: "B" }],
                          },
                          {
                            stat_id: 12,
                            enabled: "1",
                            name: "Home Runs",
                            display_name: "HR",
                            sort_order: "1",
                            position_type: "B",
                            stat_position_types: [{ position_type: "B" }],
                          },
                          {
                            stat_id: 13,
                            enabled: "1",
                            name: "Runs Batted In",
                            display_name: "RBI",
                            sort_order: "1",
                            position_type: "B",
                            stat_position_types: [{ position_type: "B" }],
                          },
                          {
                            stat_id: 16,
                            enabled: "1",
                            name: "Stolen Bases",
                            display_name: "SB",
                            sort_order: "1",
                            position_type: "B",
                            stat_position_types: [{ position_type: "B" }],
                          },
                          {
                            stat_id: 3,
                            enabled: "1",
                            name: "Batting Average",
                            display_name: "AVG",
                            sort_order: "1",
                            position_type: "B",
                            stat_position_types: [{ position_type: "B" }],
                          },
                          {
                            stat_id: 50,
                            enabled: "1",
                            name: "Innings Pitched",
                            display_name: "IP",
                            sort_order: "1",
                            position_type: "P",
                            stat_position_types: [
                              { position_type: "P", is_only_display_stat: "1" },
                            ],
                            is_only_display_stat: "1",
                          },
                          {
                            stat_id: 28,
                            enabled: "1",
                            name: "Wins",
                            display_name: "W",
                            sort_order: "1",
                            position_type: "P",
                            stat_position_types: [{ position_type: "P" }],
                          },
                          {
                            stat_id: 32,
                            enabled: "1",
                            name: "Saves",
                            display_name: "SV",
                            sort_order: "1",
                            position_type: "P",
                            stat_position_types: [{ position_type: "P" }],
                          },
                          {
                            stat_id: 42,
                            enabled: "1",
                            name: "Strikeouts",
                            display_name: "K",
                            sort_order: "1",
                            position_type: "P",
                            stat_position_types: [{ position_type: "P" }],
                          },
                          {
                            stat_id: 26,
                            enabled: "1",
                            name: "Earned Run Average",
                            display_name: "ERA",
                            sort_order: "0",
                            position_type: "P",
                            stat_position_types: [{ position_type: "P" }],
                          },
                          {
                            stat_id: 27,
                            enabled: "1",
                            name: "(Walks + Hits)/ Innings Pitched",
                            display_name: "WHIP",
                            sort_order: "0",
                            position_type: "P",
                            stat_position_types: [{ position_type: "P" }],
                          },
                        ],
                        max_adds: "31",
                        season_type: "full",
                        min_innings_pitched: "30",
                      },
                      teams: [
                        {
                          team_key: "328.l.34014.t.1",
                          team_id: "1",
                          name: "ChicksDigTheLongBall",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/1",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_6_lg.gif",
                          waiver_priority: 4,
                          number_of_moves: "19",
                          number_of_trades: 0,
                          clinched_playoffs: 1,
                          managers: [
                            {
                              manager_id: "1",
                              nickname: "--hidden--",
                              guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                              is_commissioner: "1",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.2",
                          team_id: "2",
                          name: "SALEBOAT",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/2",
                          team_logo: "https://i.imgur-ysports.com/k9xxNC8y.jpg",
                          waiver_priority: 8,
                          number_of_moves: "30",
                          number_of_trades: "2",
                          clinched_playoffs: 1,
                          managers: [
                            {
                              manager_id: "2",
                              nickname: "--hidden--",
                              guid: "APYOZ4FEZELDRTK3F3FEBYTDPY",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.3",
                          team_id: "3",
                          name: "Human Centipuig",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/3",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_1_lg.gif",
                          waiver_priority: 2,
                          number_of_moves: "21",
                          number_of_trades: 0,
                          clinched_playoffs: 1,
                          managers: [
                            {
                              manager_id: "3",
                              nickname: "--hidden--",
                              guid: "43VCZ4PSCQWJEKA2UEDRIZ65JQ",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.4",
                          team_id: "4",
                          name: "Jose Abreu",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/4",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_1_lg.gif",
                          waiver_priority: 10,
                          number_of_moves: "31",
                          number_of_trades: "1",
                          clinched_playoffs: 1,
                          managers: [
                            {
                              manager_id: "4",
                              nickname: "--hidden--",
                              guid: "JAJUZNSZORWFAP7UINDBTUWZ2A",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.5",
                          team_id: "5",
                          name: "The Beetle Bunch",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/5",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_11_lg.gif",
                          waiver_priority: 6,
                          number_of_moves: "31",
                          number_of_trades: "1",
                          clinched_playoffs: 1,
                          managers: [
                            {
                              manager_id: "5",
                              nickname: "--hidden--",
                              guid: "FI4ZS2L24CX4SD4F72MTL6O6QE",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.6",
                          team_id: "6",
                          name: "Deep In To The Night",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/6",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/profile_96.png",
                          waiver_priority: 7,
                          number_of_moves: "30",
                          number_of_trades: "2",
                          managers: [
                            {
                              manager_id: "6",
                              nickname: "--hidden--",
                              guid: "GNNX2ZSNVAWRAWXNR7GSXGCXIY",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.7",
                          team_id: "7",
                          name: "TNTNT",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/7",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_1_lg.gif",
                          waiver_priority: 11,
                          number_of_moves: "31",
                          number_of_trades: "1",
                          clinched_playoffs: 1,
                          managers: [
                            {
                              manager_id: "7",
                              nickname: "--hidden--",
                              guid: "3TORY3MNIUTVTE4LGFNECRT4VA",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.8",
                          team_id: "8",
                          name: "Bronx Bombers",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/8",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/profile_96.png",
                          waiver_priority: 5,
                          number_of_moves: "30",
                          number_of_trades: "4",
                          managers: [
                            {
                              manager_id: "8",
                              nickname: "--hidden--",
                              guid: "TFQ27G3QYLXC46WOKKFGSDX2JE",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.9",
                          team_id: "9",
                          name: "You Down With OBP?",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/9",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_1_lg.gif",
                          waiver_priority: 3,
                          number_of_moves: "19",
                          number_of_trades: "3",
                          managers: [
                            {
                              manager_id: "9",
                              nickname: "--hidden--",
                              guid: "S2YGZELAJVUBSWHGSXGKNTEBVQ",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.10",
                          team_id: "10",
                          name: "Jays of Thunder",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/10",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_4_lg.gif",
                          waiver_priority: 9,
                          number_of_moves: "30",
                          number_of_trades: "3",
                          clinched_playoffs: 1,
                          managers: [
                            {
                              manager_id: "10",
                              nickname: "--hidden--",
                              guid: "5DNOGI6CO6Y6GDZCRICACC6YFE",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.11",
                          team_id: "11",
                          name: "BaseOnBalls",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/11",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_12_lg.gif",
                          waiver_priority: 1,
                          number_of_moves: "29",
                          number_of_trades: 0,
                          clinched_playoffs: 1,
                          managers: [
                            {
                              manager_id: "11",
                              nickname: "--hidden--",
                              guid: "USBPVWVCNM4RNPGM4ZGZRQS7MQ",
                            },
                          ],
                        },
                        {
                          team_key: "328.l.34014.t.12",
                          team_id: "12",
                          name: "Nino Something",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/12",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_10_lg.gif",
                          waiver_priority: 12,
                          number_of_moves: "18",
                          number_of_trades: "1",
                          managers: [
                            {
                              manager_id: "12",
                              nickname: "--hidden--",
                              guid: "HF2I4HQA4LCNT7AHXJXWVEXOEQ",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      league_key: "341.l.21063",
                      league_id: "21063",
                      name: "theREDleague",
                      url: "http://hockey.fantasysports.yahoo.com/hockey/21063",
                      league_chat_id: "i4wgg2248hsmv691jyquf4ij96yho7z",
                      draft_status: "postdraft",
                      num_teams: 14,
                      edit_key: "2015-02-04",
                      weekly_deadline: "intraday",
                      league_update_timestamp: "1423037703",
                      scoring_type: "point",
                      league_type: "private",
                      renew: "321_63055",
                      renewed: "",
                      short_invitation_url:
                        "https://yho.com/nhl?l=21063&k=7a5b54fa3927ebc2",
                      is_pro_league: "0",
                      start_date: "2014-10-08",
                      end_date: "2015-04-11",
                      settings: {
                        draft_type: "live",
                        is_auction_draft: "1",
                        scoring_type: "point",
                        persistent_url:
                          "http://hockey.fantasysports.yahoo.com/league/theredleague",
                        uses_playoff: "0",
                        waiver_type: "R",
                        waiver_rule: "all",
                        uses_faab: "0",
                        draft_time: "1412195400",
                        post_draft_players: "W",
                        max_teams: "15",
                        waiver_time: "2",
                        trade_end_date: "2015-03-05",
                        trade_ratify_type: "commish",
                        trade_reject_time: "2",
                        player_pool: "ALL",
                        cant_cut_list: "yahoo",
                        is_publicly_viewable: "1",
                        roster_positions: [
                          { position: "C", position_type: "P", count: 2 },
                          { position: "LW", position_type: "P", count: 2 },
                          { position: "RW", position_type: "P", count: 2 },
                          { position: "F", position_type: "P", count: 4 },
                          { position: "D", position_type: "P", count: 3 },
                          { position: "Util", position_type: "P", count: 1 },
                          { position: "G", position_type: "G", count: 2 },
                          { position: "BN", count: 2 },
                          { position: "IR", count: "2" },
                        ],
                        stat_categories: [
                          {
                            stat_id: 1,
                            enabled: "1",
                            name: "Goals",
                            display_name: "G",
                            sort_order: "1",
                            position_type: "P",
                            stat_position_types: [{ position_type: "P" }],
                          },
                          {
                            stat_id: 2,
                            enabled: "1",
                            name: "Assists",
                            display_name: "A",
                            sort_order: "1",
                            position_type: "P",
                            stat_position_types: [{ position_type: "P" }],
                          },
                          {
                            stat_id: 19,
                            enabled: "1",
                            name: "Wins",
                            display_name: "W",
                            sort_order: "1",
                            position_type: "G",
                            stat_position_types: [{ position_type: "G" }],
                          },
                          {
                            stat_id: 27,
                            enabled: "1",
                            name: "Shutouts",
                            display_name: "SHO",
                            sort_order: "1",
                            position_type: "G",
                            stat_position_types: [{ position_type: "G" }],
                          },
                        ],
                        stat_modifiers: {
                          stats: [
                            { stat: { stat_id: 1, value: "1" } },
                            { stat: { stat_id: 2, value: "1" } },
                            { stat: { stat_id: 19, value: "2" } },
                            { stat: { stat_id: 27, value: "3" } },
                          ],
                        },
                        max_adds: "60",
                      },
                      teams: [
                        {
                          team_key: "341.l.21063.t.1",
                          team_id: "1",
                          name: "Neal in the Staal",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/1",
                          team_logo: "https://i.imgur-ysports.com/PhEXA9Ry.jpg",
                          waiver_priority: 10,
                          number_of_moves: "8",
                          number_of_trades: 0,
                          managers: [
                            {
                              manager_id: "1",
                              nickname: "--hidden--",
                              guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                              is_commissioner: "1",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.2",
                          team_id: "2",
                          name: "Hall you Drouin?",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/2",
                          team_logo: "https://i.imgur-ysports.com/ZvpiNcwy.jpg",
                          waiver_priority: 9,
                          number_of_moves: "9",
                          number_of_trades: "1",
                          managers: [
                            {
                              manager_id: "2",
                              nickname: "--hidden--",
                              guid: "EM45FGNSMDB6EAXBZ7EB6UG2UU",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.3",
                          team_id: "3",
                          name: "Dubnykstep",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/3",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/nhl/icon_01_100.png",
                          waiver_priority: 12,
                          number_of_moves: "53",
                          number_of_trades: 0,
                          managers: [
                            {
                              manager_id: "3",
                              nickname: "--hidden--",
                              guid: "VZRMX6R7VCJFSDZ4TDQIC43YPM",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.4",
                          team_id: "4",
                          name: "Zach Attack",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/4",
                          team_logo: "https://i.imgur-ysports.com/qxg1sHKy.jpg",
                          waiver_priority: 3,
                          number_of_moves: "21",
                          number_of_trades: 0,
                          managers: [
                            {
                              manager_id: "4",
                              nickname: "--hidden--",
                              guid: "5N7UMLTGWWTAJOYM643JP3UFRU",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.5",
                          team_id: "5",
                          name: "The Underdogs",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/5",
                          team_logo: "https://i.imgur-ysports.com/7SoRlVgy.png",
                          waiver_priority: 5,
                          number_of_moves: "11",
                          number_of_trades: "5",
                          managers: [
                            {
                              manager_id: "5",
                              nickname: "--hidden--",
                              guid: "UMWKHLBMA2G3IQ7TCOUXPYJRTA",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.6",
                          team_id: "6",
                          name: "1st place in NFL",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/6",
                          team_logo: "https://i.imgur-ysports.com/c3u36uZy.jpg",
                          waiver_priority: 11,
                          number_of_moves: "44",
                          number_of_trades: "7",
                          managers: [
                            {
                              manager_id: "6",
                              nickname: "--hidden--",
                              guid: "RVS5BJALVUISRPUFQOCG4QZ3MM",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.7",
                          team_id: "7",
                          name: "JimiVanRimi",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/7",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/nhl/icon_10_100.png",
                          waiver_priority: 7,
                          number_of_moves: "17",
                          number_of_trades: "1",
                          managers: [
                            {
                              manager_id: "7",
                              nickname: "--hidden--",
                              guid: "X6AKVPYD5F44CXBPBMSBI5C5ZU",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.8",
                          team_id: "8",
                          name: "MaxPower",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/8",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/nhl/icon_07_100.png",
                          waiver_priority: 14,
                          number_of_moves: "27",
                          number_of_trades: "2",
                          managers: [
                            {
                              manager_id: "8",
                              nickname: "--hidden--",
                              guid: "3LGCUA3BZIBJDD3H7PVJ63OACU",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.9",
                          team_id: "9",
                          name: "Malkin on Sunshine",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/9",
                          team_logo: "https://i.imgur-ysports.com/I9eBWSLy.jpg",
                          waiver_priority: 8,
                          number_of_moves: "8",
                          number_of_trades: "1",
                          managers: [
                            {
                              manager_id: "9",
                              nickname: "--hidden--",
                              guid: "3YCSKE5KW6L2AJNESFATASB3XA",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.10",
                          team_id: "10",
                          name: "Crosby Style",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/10",
                          team_logo: "https://i.imgur-ysports.com/iqGerQEy.jpg",
                          waiver_priority: 13,
                          number_of_moves: "4",
                          number_of_trades: "1",
                          managers: [
                            {
                              manager_id: "10",
                              nickname: "--hidden--",
                              guid: "5PVZPOS7EA4PE5EFU6LRCWILBI",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.11",
                          team_id: "11",
                          name: "Shawn's Super Team",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/11",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/nhl/icon_11_100.png",
                          waiver_priority: 4,
                          number_of_moves: "12",
                          number_of_trades: "3",
                          managers: [
                            {
                              manager_id: "11",
                              nickname: "--hidden--",
                              guid: "344I3U555VJBEVUQTJA77H7664",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.12",
                          team_id: "12",
                          name: "The Quick & the Sed",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/12",
                          team_logo: "https://i.imgur-ysports.com/FSqFa7my.png",
                          waiver_priority: 2,
                          number_of_moves: "5",
                          number_of_trades: "2",
                          managers: [
                            {
                              manager_id: "12",
                              nickname: "--hidden--",
                              guid: "SIUNFQHKMMAVM6RUV6DZAYCROQ",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.13",
                          team_id: "13",
                          name: "The Price Was Right",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/13",
                          team_logo: "https://i.imgur-ysports.com/jy8IowKy.jpg",
                          waiver_priority: 1,
                          number_of_moves: "35",
                          number_of_trades: "3",
                          managers: [
                            {
                              manager_id: "13",
                              nickname: "--hidden--",
                              guid: "DR3NDS7BZCAH5M75LXVCAVRMK4",
                            },
                          ],
                        },
                        {
                          team_key: "341.l.21063.t.14",
                          team_id: "14",
                          name: "Benn there Doan that",
                          url:
                            "http://hockey.fantasysports.yahoo.com/hockey/21063/14",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/nhl/icon_05_100.png",
                          waiver_priority: 6,
                          number_of_moves: "17",
                          number_of_trades: 0,
                          managers: [
                            {
                              manager_id: "14",
                              nickname: "--hidden--",
                              guid: "YGJYPQAKGAGRA73Y6CNJK4Q4HY",
                            },
                          ],
                        },
                      ],
                    },
                  ],
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

export default TransactionsFetch;
