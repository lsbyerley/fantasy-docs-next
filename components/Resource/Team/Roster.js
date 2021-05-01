import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const TeamRoster = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [teamKey, setTeamKey] = useState(null);
  const [teamKeyError, setTeamKeyError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === teamKey) {
      return setTeamKeyError(true);
    } else {
      setTeamKeyError(false);
    }

    setLoading(true);

    const data = await api("/team/roster", {
      teamKey,
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
      <h2 className={cx(appStyles.public, appStyles.private)}>team.roster</h2>
      <p>
        Retrieve a team roster. Users must be authenticated and a member of the
        league to query against teams of private leagues.
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
                team_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: teamKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setTeamKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The key for the team you'd like to query. Team key format:{" "}
                {`{game_key}.l.{league_id}.t.{team_id}`}
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {teamKeyError && (
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
  const roster = await yf.team.roster(team_key);
} catch (e) {
  // handle error
}

// callback based
yf.team.roster(team_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    team_key: "328.l.34014.t.1",
                    team_id: "1",
                    name: "ChicksDigTheLongBall",
                    url: "http://baseball.fantasysports.yahoo.com/b1/34014/1",
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
                    roster: [
                      {
                        player_key: "328.p.7276",
                        player_id: "7276",
                        name: {
                          full: "Dioner Navarro",
                          first: "Dioner",
                          last: "Navarro",
                          ascii_first: "Dioner",
                          ascii_last: "Navarro",
                        },
                        editorial_player_key: "mlb.p.7276",
                        editorial_team_key: "mlb.t.14",
                        editorial_team_full_name: "Toronto Blue Jays",
                        editorial_team_abbr: "Tor",
                        uniform_number: "30",
                        display_position: "C",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/kOsVClMYWdAbQ9jafx4DdQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/7276.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["C", "Util"],
                      },
                      {
                        player_key: "328.p.8640",
                        player_id: "8640",
                        name: {
                          full: "Chris Carter",
                          first: "Chris",
                          last: "Carter",
                          ascii_first: "Chris",
                          ascii_last: "Carter",
                        },
                        editorial_player_key: "mlb.p.8640",
                        editorial_team_key: "mlb.t.18",
                        editorial_team_full_name: "Houston Astros",
                        editorial_team_abbr: "Hou",
                        uniform_number: "23",
                        display_position: "1B,OF",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/CbJLLSscA5KlmDx6ViDAEQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8640.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["1B", "OF", "Util"],
                      },
                      {
                        player_key: "328.p.7483",
                        player_id: "7483",
                        name: {
                          full: "Aaron Hill",
                          first: "Aaron",
                          last: "Hill",
                          ascii_first: "Aaron",
                          ascii_last: "Hill",
                        },
                        editorial_player_key: "mlb.p.7483",
                        editorial_team_key: "mlb.t.29",
                        editorial_team_full_name: "Arizona Diamondbacks",
                        editorial_team_abbr: "Ari",
                        uniform_number: "2",
                        display_position: "2B,3B",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/_gTORgzx8pE0wjbcWkV7Jg--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/7483.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["2B", "3B", "Util"],
                      },
                      {
                        player_key: "328.p.7163",
                        player_id: "7163",
                        name: {
                          full: "Miguel Cabrera",
                          first: "Miguel",
                          last: "Cabrera",
                          ascii_first: "Miguel",
                          ascii_last: "Cabrera",
                        },
                        editorial_player_key: "mlb.p.7163",
                        editorial_team_key: "mlb.t.6",
                        editorial_team_full_name: "Detroit Tigers",
                        editorial_team_abbr: "Det",
                        uniform_number: "24",
                        display_position: "1B,3B",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/iRF.VaCf.VAeG1P2pbNaLQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/7163.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["1B", "3B", "Util"],
                      },
                      {
                        player_key: "328.p.7066",
                        player_id: "7066",
                        name: {
                          full: "José Reyes",
                          first: "José",
                          last: "Reyes",
                          ascii_first: "Jose",
                          ascii_last: "Reyes",
                        },
                        editorial_player_key: "mlb.p.7066",
                        editorial_team_key: "mlb.t.14",
                        editorial_team_full_name: "Toronto Blue Jays",
                        editorial_team_abbr: "Tor",
                        uniform_number: "7",
                        display_position: "SS",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/NvuJPYFTGVZA26PUBl9HJg--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/7066.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["SS", "Util"],
                      },
                      {
                        player_key: "328.p.8412",
                        player_id: "8412",
                        name: {
                          full: "Austin Jackson",
                          first: "Austin",
                          last: "Jackson",
                          ascii_first: "Austin",
                          ascii_last: "Jackson",
                        },
                        editorial_player_key: "mlb.p.8412",
                        editorial_team_key: "mlb.t.12",
                        editorial_team_full_name: "Seattle Mariners",
                        editorial_team_abbr: "Sea",
                        uniform_number: "16",
                        display_position: "OF",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/mFHcwXfS3ynlxYlFeMA2Vw--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8412.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["OF", "Util"],
                      },
                      {
                        player_key: "328.p.8213",
                        player_id: "8213",
                        name: {
                          full: "Denard Span",
                          first: "Denard",
                          last: "Span",
                          ascii_first: "Denard",
                          ascii_last: "Span",
                        },
                        editorial_player_key: "mlb.p.8213",
                        editorial_team_key: "mlb.t.20",
                        editorial_team_full_name: "Washington Nationals",
                        editorial_team_abbr: "Was",
                        uniform_number: "2",
                        display_position: "OF",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/7T3oMXiGGMY_nIj8A0ctgQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8213.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["OF", "Util"],
                      },
                      {
                        player_key: "328.p.8117",
                        player_id: "8117",
                        name: {
                          full: "Steve Pearce",
                          first: "Steve",
                          last: "Pearce",
                          ascii_first: "Steve",
                          ascii_last: "Pearce",
                        },
                        editorial_player_key: "mlb.p.8117",
                        editorial_team_key: "mlb.t.1",
                        editorial_team_full_name: "Baltimore Orioles",
                        editorial_team_abbr: "Bal",
                        uniform_number: "28",
                        display_position: "1B,OF",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/pFOvtySofgL..r8lpyhq3A--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8117.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["1B", "OF", "Util"],
                      },
                      {
                        player_key: "328.p.8169",
                        player_id: "8169",
                        name: {
                          full: "Alexei Ramírez",
                          first: "Alexei",
                          last: "Ramírez",
                          ascii_first: "Alexei",
                          ascii_last: "Ramirez",
                        },
                        editorial_player_key: "mlb.p.8169",
                        editorial_team_key: "mlb.t.4",
                        editorial_team_full_name: "Chicago White Sox",
                        editorial_team_abbr: "CWS",
                        uniform_number: "10",
                        display_position: "SS",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/kA6klmisBnjzZwpMg3YRmw--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8169.1.jpg",
                        is_undroppable: "0",
                        position_type: "B",
                        eligible_positions: ["SS", "Util"],
                      },
                      {
                        player_key: "328.p.8554",
                        player_id: "8554",
                        name: {
                          full: "Doug Fister",
                          first: "Doug",
                          last: "Fister",
                          ascii_first: "Doug",
                          ascii_last: "Fister",
                        },
                        editorial_player_key: "mlb.p.8554",
                        editorial_team_key: "mlb.t.20",
                        editorial_team_full_name: "Washington Nationals",
                        editorial_team_abbr: "Was",
                        uniform_number: "58",
                        display_position: "SP",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/YydEMGu1uRLY_CiidLbXHQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8554.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                      },
                      {
                        player_key: "328.p.8167",
                        player_id: "8167",
                        name: {
                          full: "Hiroki Kuroda",
                          first: "Hiroki",
                          last: "Kuroda",
                          ascii_first: "Hiroki",
                          ascii_last: "Kuroda",
                        },
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/2ikisPv2pASBp0vUbxzcbw--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8167.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                      },
                      {
                        player_key: "328.p.6525",
                        player_id: "6525",
                        name: {
                          full: "Mark Buehrle",
                          first: "Mark",
                          last: "Buehrle",
                          ascii_first: "Mark",
                          ascii_last: "Buehrle",
                        },
                        editorial_player_key: "mlb.p.6525",
                        editorial_team_key: "mlb.t.14",
                        editorial_team_full_name: "Toronto Blue Jays",
                        editorial_team_abbr: "Tor",
                        uniform_number: "56",
                        display_position: "SP",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/i2GmbD71kkgSKCcpIktTkQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/6525.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                      },
                      {
                        player_key: "328.p.9334",
                        player_id: "9334",
                        name: {
                          full: "Kevin Gausman",
                          first: "Kevin",
                          last: "Gausman",
                          ascii_first: "Kevin",
                          ascii_last: "Gausman",
                        },
                        editorial_player_key: "mlb.p.9334",
                        editorial_team_key: "mlb.t.1",
                        editorial_team_full_name: "Baltimore Orioles",
                        editorial_team_abbr: "Bal",
                        uniform_number: "39",
                        display_position: "SP,RP",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/ogJnNTQCWTXRN5OTp2dIuw--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/9334.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP", "RP"],
                      },
                      {
                        player_key: "328.p.8773",
                        player_id: "8773",
                        name: {
                          full: "Greg Holland",
                          first: "Greg",
                          last: "Holland",
                          ascii_first: "Greg",
                          ascii_last: "Holland",
                        },
                        editorial_player_key: "mlb.p.8773",
                        editorial_team_key: "mlb.t.7",
                        editorial_team_full_name: "Kansas City Royals",
                        editorial_team_abbr: "KC",
                        uniform_number: "56",
                        display_position: "RP",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/kNHExdlbfptjOyuMDERWiQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8773.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["RP"],
                      },
                      {
                        player_key: "328.p.8176",
                        player_id: "8176",
                        name: {
                          full: "Jake McGee",
                          first: "Jake",
                          last: "McGee",
                          ascii_first: "Jake",
                          ascii_last: "McGee",
                        },
                        editorial_player_key: "mlb.p.8176",
                        editorial_team_key: "mlb.t.30",
                        editorial_team_full_name: "Tampa Bay Rays",
                        editorial_team_abbr: "TB",
                        uniform_number: "57",
                        display_position: "RP",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/D0vSgATUgd9Q0qUmMFfPnw--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8176.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["RP"],
                      },
                      {
                        player_key: "328.p.7484",
                        player_id: "7484",
                        name: {
                          full: "Brandon McCarthy",
                          first: "Brandon",
                          last: "McCarthy",
                          ascii_first: "Brandon",
                          ascii_last: "McCarthy",
                        },
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/hwNAziEnZUZ9jzhoKRevnA--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/7484.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                      },
                      {
                        player_key: "328.p.5763",
                        player_id: "5763",
                        name: {
                          full: "Bartolo Colón",
                          first: "Bartolo",
                          last: "Colón",
                          ascii_first: "Bartolo",
                          ascii_last: "Colon",
                        },
                        editorial_player_key: "mlb.p.5763",
                        editorial_team_key: "mlb.t.21",
                        editorial_team_full_name: "New York Mets",
                        editorial_team_abbr: "NYM",
                        uniform_number: "40",
                        display_position: "SP",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/eEfOghjyp_ulwInr12a.pQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/5763.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                      },
                      {
                        player_key: "328.p.9019",
                        player_id: "9019",
                        name: {
                          full: "Wily Peralta",
                          first: "Wily",
                          last: "Peralta",
                          ascii_first: "Wily",
                          ascii_last: "Peralta",
                        },
                        editorial_player_key: "mlb.p.9019",
                        editorial_team_key: "mlb.t.8",
                        editorial_team_full_name: "Milwaukee Brewers",
                        editorial_team_abbr: "Mil",
                        uniform_number: "38",
                        display_position: "SP",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/ZSuXxw7.5p13MP1x6pnVUQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/9019.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                      },
                      {
                        player_key: "328.p.7779",
                        player_id: "7779",
                        name: {
                          full: "James Shields",
                          first: "James",
                          last: "Shields",
                          ascii_first: "James",
                          ascii_last: "Shields",
                        },
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/xKmGmi3TRxpDor.2kAC2Tg--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/7779.1.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP"],
                      },
                      {
                        player_key: "328.p.9140",
                        player_id: "9140",
                        name: {
                          full: "Drew Smyly",
                          first: "Drew",
                          last: "Smyly",
                          ascii_first: "Drew",
                          ascii_last: "Smyly",
                        },
                        editorial_player_key: "mlb.p.9140",
                        editorial_team_key: "mlb.t.30",
                        editorial_team_full_name: "Tampa Bay Rays",
                        editorial_team_abbr: "TB",
                        uniform_number: "33",
                        display_position: "SP,RP",
                        headshot:
                          "http://l.yimg.com/iu/api/res/1.2/74J.jivrFHaJvz7c9G6RBQ--/YXBwaWQ9eXZpZGVvO…0Ng--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20120530/9140.jpg",
                        is_undroppable: "0",
                        position_type: "P",
                        eligible_positions: ["SP", "RP"],
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

export default TeamRoster;
