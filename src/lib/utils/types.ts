export const eventsToTrack = [
  "begin_new_match", "round_start", "round_end", "round_mvp", 
  "player_death", "bomb_planted", "bomb_defused", "hostage_rescued", 
  "weapon_fire", "flashbang_detonate", "hegrenade_detonate", 
  "molotov_detonate", "smokegrenade_detonate", "player_hurt", 
  "team_score_first_half", "team_score_second_half",
  "player_blind"
];

export const tickEventsToTrack = [
  "X", "Y", "Z", "pitch", "yaw",
  "velocity_X", "velocity_Y", "velocity_Z",
  "has_defuser",
  "armor_value", "has_helmet",
  "health",
  "balance",
  "equipment_value_this_round", "cash_spent_this_round",
  "is_alive", "team_num", "player_name", 
  "kills_total", "assists_total", "damage_total",
  "deaths_total", "mvps", "headshot_kills_total", "score",
  "team_rounds_total",
  "player_steamid",
  "inventory"
];

export type roundScore = {
  score: string;
  winningSide: 'CT' | 'T';
  2: number;
  3: number;
}

export type rounds = {
  matchStartTick: number;
  matchEndTick: number;
  roundStartEvents: gameEvent[];
  roundEndEvents: gameEvent[];
}

export type gameEvent = Map<string, unknown>

export type teamNames = {
  2: {
    short: string;
    long: string;
  },
  3: {
    short: string;
    long: string;
  }
}

export type playerState = {
  steamId: string;
  name: string;
  team: 2 | 3;
  health: number;
  armor: number;
  helmet: boolean;
  defuser: boolean;
  mvps: number;
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
  cash: number;
}
