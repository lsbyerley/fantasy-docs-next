import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const GameStatCategories = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [gameKey, setGameKey] = useState(null);
  const [gameKeyError, setGameKeyError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === gameKey) {
      return setGameKeyError(true);
    } else {
      setGameKeyError(false);
    }

    setLoading(true);

    const data = await api("/game/stat_categories", {
      gameKey,
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
      <h2 className={appStyles.public}>game.stat_categories</h2>
      <p>Retrieve all stat categories for a specified game.</p>

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
                game_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: gameKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setGameKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                Key for the game you want to query. You can find a list of
                common game_ids in the{" "}
                <a
                  href="https://developer.yahoo.com/fantasysports/guide/#game-resource"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  official Yahoo! Fantasy Sports documentation for the game
                  resource
                </a>
                . Game key examples: 'mlb', 'nfl', 328 (2014 MLB season), 242
                (2010 NFL season)
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {gameKeyError && (
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
  const stat_categories = await yf.game.stat_categories(game_key);
} catch (e) {
  // handle error
}

// callback based
yf.game.stat_categories(game_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    game_key: "328",
                    game_id: "328",
                    name: "Baseball",
                    code: "mlb",
                    type: "full",
                    url: "http://baseball.fantasysports.yahoo.com/b1",
                    season: "2014",
                    stat_categories: [
                      {
                        stat_id: 0,
                        name: "Games Played",
                        display_name: "GP",
                        sort_order: "1",
                        position_types: ["P", "B"],
                      },
                      {
                        stat_id: 1,
                        name: "Games Played",
                        display_name: "GP",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 2,
                        name: "Games Started",
                        display_name: "GS",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 3,
                        name: "Batting Average",
                        display_name: "AVG",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["6", "8"],
                        position_types: ["B"],
                      },
                      {
                        stat_id: 4,
                        name: "On-base Percentage",
                        display_name: "OBP",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["6", "8", "15", "18", "20"],
                        position_types: ["B"],
                      },
                      {
                        stat_id: 5,
                        name: "Slugging Percentage",
                        display_name: "SLG",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["6", "23"],
                        position_types: ["B"],
                      },
                      {
                        stat_id: 6,
                        name: "At Bats",
                        display_name: "AB",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 7,
                        name: "Runs",
                        display_name: "R",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 8,
                        name: "Hits",
                        display_name: "H",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 9,
                        name: "Singles",
                        display_name: "1B",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 10,
                        name: "Doubles",
                        display_name: "2B",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 11,
                        name: "Triples",
                        display_name: "3B",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 12,
                        name: "Home Runs",
                        display_name: "HR",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 13,
                        name: "Runs Batted In",
                        display_name: "RBI",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 14,
                        name: "Sacrifice Hits",
                        display_name: "SH",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 15,
                        name: "Sacrifice Flys",
                        display_name: "SF",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 16,
                        name: "Stolen Bases",
                        display_name: "SB",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 17,
                        name: "Caught Stealing",
                        display_name: "CS",
                        sort_order: "0",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 18,
                        name: "Walks",
                        display_name: "BB",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 19,
                        name: "Intentional Walks",
                        display_name: "IBB",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 20,
                        name: "Hit By Pitch",
                        display_name: "HBP",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 21,
                        name: "Strikeouts",
                        display_name: "K",
                        sort_order: "0",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 22,
                        name: "Ground Into Double Play",
                        display_name: "GIDP",
                        sort_order: "0",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 23,
                        name: "Total Bases",
                        display_name: "TB",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 24,
                        name: "Pitching Appearances",
                        display_name: "APP",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 25,
                        name: "Games Started",
                        display_name: "GS",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 26,
                        name: "Earned Run Average",
                        display_name: "ERA",
                        sort_order: "0",
                        is_composite_stat: 1,
                        base_stats: ["33", "37"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 27,
                        name: "(Walks + Hits)/ Innings Pitched",
                        display_name: "WHIP",
                        sort_order: "0",
                        is_composite_stat: 1,
                        base_stats: ["33", "34", "39"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 28,
                        name: "Wins",
                        display_name: "W",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 29,
                        name: "Losses",
                        display_name: "L",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 30,
                        name: "Complete Games",
                        display_name: "CG",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 31,
                        name: "Shutouts",
                        display_name: "SHO",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 32,
                        name: "Saves",
                        display_name: "SV",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 33,
                        name: "Outs",
                        display_name: "OUT",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 34,
                        name: "Hits",
                        display_name: "H",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 35,
                        name: "Total Batters Faced",
                        display_name: "TBF",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 36,
                        name: "Runs",
                        display_name: "R",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 37,
                        name: "Earned Runs",
                        display_name: "ER",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 38,
                        name: "Home Runs",
                        display_name: "HR",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 39,
                        name: "Walks",
                        display_name: "BB",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 40,
                        name: "Intentional Walks",
                        display_name: "IBB",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 41,
                        name: "Hit Batters",
                        display_name: "HBP",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 42,
                        name: "Strikeouts",
                        display_name: "K",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 43,
                        name: "Wild Pitches",
                        display_name: "WP",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 44,
                        name: "Balks",
                        display_name: "BLK",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 45,
                        name: "Stolen Bases Allowed",
                        display_name: "SB",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 46,
                        name: "Batters Grounded Into Double Plays",
                        display_name: "GIDP",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 47,
                        name: "Save Chances",
                        display_name: "SVOP",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 48,
                        name: "Holds",
                        display_name: "HLD",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 49,
                        name: "Total Bases Allowed",
                        display_name: "TB",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 50,
                        name: "Innings Pitched",
                        display_name: "IP",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["33"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 51,
                        name: "Putouts",
                        display_name: "PO",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 52,
                        name: "Assists",
                        display_name: "A",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 53,
                        name: "Errors",
                        display_name: "E",
                        sort_order: "0",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 54,
                        name: "Fielding Percentage",
                        display_name: "FPCT",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["51", "52", "53"],
                        position_types: ["B"],
                      },
                      {
                        stat_id: 55,
                        name: "On-base + Slugging Percentage",
                        display_name: "OPS",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["6", "8", "15", "18", "20", "23"],
                        position_types: ["B"],
                      },
                      {
                        stat_id: 56,
                        name: "Strikeouts per Walk Ratio",
                        display_name: "K/BB",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["42", "39"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 57,
                        name: "Strikeouts per Nine Innings",
                        display_name: "K/9",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["42", "33"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 58,
                        name: "Team",
                        display_name: "TEAM",
                        sort_order: "1",
                        position_types: ["P", "B"],
                      },
                      {
                        stat_id: 59,
                        name: "League",
                        display_name: "LEAGUE",
                        sort_order: "1",
                        position_types: ["P", "B"],
                      },
                      {
                        stat_id: 60,
                        name: "H/AB",
                        display_name: "H/AB",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["6", "8"],
                      },
                      {
                        stat_id: 61,
                        name: "Extra Base Hits",
                        display_name: "XBH",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["10", "11", "12"],
                        position_types: ["B"],
                      },
                      {
                        stat_id: 62,
                        name: "Net Stolen Bases",
                        display_name: "NSB",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["16", "17"],
                        position_types: ["B"],
                      },
                      {
                        stat_id: 63,
                        name: "Stolen Base Percentage",
                        display_name: "SB%",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["16", "17"],
                        position_types: ["B"],
                      },
                      {
                        stat_id: 64,
                        name: "Hitting for the Cycle",
                        display_name: "CYC",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 65,
                        name: "Plate Appearances",
                        display_name: "PA",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["6", "18", "20", "14", "15", "88"],
                        position_types: ["B"],
                      },
                      {
                        stat_id: 66,
                        name: "Grand Slam Home Runs",
                        display_name: "SLAM",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 67,
                        name: "Pitch Count",
                        display_name: "PC",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 68,
                        name: "Doubles Allowed",
                        display_name: "2BA",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 69,
                        name: "Triples Allowed",
                        display_name: "3BA",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 70,
                        name: "Relief Wins",
                        display_name: "RW",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 71,
                        name: "Relief Losses",
                        display_name: "RL",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 72,
                        name: "Pickoffs",
                        display_name: "PICK",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 73,
                        name: "Relief Appearances",
                        display_name: "RAPP",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 74,
                        name: "On-base Percentage Against",
                        display_name: "OBPA",
                        sort_order: "0",
                        is_composite_stat: 1,
                        base_stats: ["34", "39", "41", "35"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 75,
                        name: "Winning Percentage",
                        display_name: "WIN%",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["28", "29"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 76,
                        name: "Singles Allowed",
                        display_name: "1BA",
                        sort_order: "0",
                        is_composite_stat: 1,
                        base_stats: ["34", "68", "69", "38"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 77,
                        name: "Hits Per Nine Innings",
                        display_name: "H/9",
                        sort_order: "0",
                        is_composite_stat: 1,
                        base_stats: ["34", "33"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 78,
                        name: "Walks Per Nine Innings",
                        display_name: "BB/9",
                        sort_order: "0",
                        is_composite_stat: 1,
                        base_stats: ["39", "33"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 79,
                        name: "No Hitters",
                        display_name: "NH",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 80,
                        name: "Perfect Games",
                        display_name: "PG",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 81,
                        name: "Save Percentage",
                        display_name: "SV%",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["32", "47"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 82,
                        name: "Inherited Runners Scored",
                        display_name: "IRA",
                        sort_order: "0",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 83,
                        name: "Quality Starts",
                        display_name: "QS",
                        sort_order: "1",
                        position_types: ["P"],
                      },
                      {
                        stat_id: 84,
                        name: "Blown Saves",
                        display_name: "BSV",
                        sort_order: "0",
                        is_composite_stat: 1,
                        base_stats: ["47", "32"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 85,
                        name: "Net Saves",
                        display_name: "NSV",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["32", "47"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 86,
                        name: "Outfield Assists",
                        display_name: "OFA",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 87,
                        name: "Double Plays Turned",
                        display_name: "DPT",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 88,
                        name: "Catcher Interference",
                        display_name: "CI",
                        sort_order: "1",
                        position_types: ["B"],
                      },
                      {
                        stat_id: 89,
                        name: "Saves + Holds",
                        display_name: "SV+H",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["32", "48"],
                        position_types: ["P"],
                      },
                      {
                        stat_id: 90,
                        name: "Net Saves and Holds",
                        display_name: "NSVH",
                        sort_order: "1",
                        is_composite_stat: 1,
                        base_stats: ["32", "48", "47"],
                        position_types: ["P"],
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

export default GameStatCategories;
