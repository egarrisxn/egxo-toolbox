import { Player, PlayerOptions } from "./types";

export const getPlayer = (
  elementId: string | HTMLElement,
  options: PlayerOptions
): Player => {
  return new window.YT.Player(elementId, options);
};
