import { fetchWhitelistedEmotes } from './fetchWhitelistedEmotes'
import { fetchGlobalEmotes } from './fetchGlobalEmotes'

// Allow all global Twitch emotes available for everyone and the channels you're subbed to (from whitelistEmotes.json)
export const getAllowedEmotes = async (
  whitelistChannels: string[]
): Promise<number[]> => {
  const globalEmotes = await fetchGlobalEmotes()
  const whitelistedEmotes = await fetchWhitelistedEmotes(whitelistChannels)

  return [...globalEmotes, ...whitelistedEmotes]
}

// Check if message contains any sub emotes (except for the channels you're subbed to)
export const hasSubEmotes = (
  allowedEmotes: number[],
  emoteCodes: number[]
): boolean => {
  return (
    emoteCodes.length !== 0 &&
    emoteCodes.filter((code) => !allowedEmotes.includes(code)).length !== 0
  )
}
