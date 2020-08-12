import Config from "./config.json";

export function getConfig() {
    let env = process.env.REACT_APP_NODE_ENV ? process.env.REACT_APP_NODE_ENV : "common";
    return Config[env];
}