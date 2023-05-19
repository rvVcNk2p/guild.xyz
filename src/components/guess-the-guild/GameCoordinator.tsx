import { GetStaticProps } from "next"
import { useMemo } from "react"
import useSWR from "swr"
import { GuildBase } from "types"
import fetcher from "utils/fetcher"
import { Puzzle, Puzzles, useGame } from "./GameContext"
import GameInitialization from "./control/GameInitialization"
import GameResult from "./control/GameResult"
import LogoGuessingGame from "./games/LogoGuessingGame"
import PairingGame from "./games/PairingGame"

type Props = {
  guilds?: GuildBase[]
}

const GameCoordinator = ({ guilds: guildsInitial }: Props): JSX.Element => {
  const {
    data: [allGuilds, filteredGuilds],
    isValidating: isLoading,
  } = useSWR(
    "/guild??order=members",
    (url: string) =>
      fetcher(url).then((data) => [
        data,
        data.filter(
          (guild) =>
            (guild.platforms?.length > 0 && guild.memberCount > 0) ||
            guild.memberCount > 1
        ),
      ]),
    {
      fallbackData: [guildsInitial, guildsInitial],
      dedupingInterval: 60000, // one minute
    }
  )

  const renderedGuilds = useMemo(
    () => filteredGuilds?.slice(0, 1000) || [],
    [filteredGuilds]
  )

  const game = useGame()

  const nextPuzzle = (): Puzzle | null => {
    if (game.puzzles.length > 0 && game.isGame) {
      return game.puzzles[game.activeStep]
    } else return null
  }

  const getActiveComponent = () => {
    if (!game.isGame) {
      return <GameInitialization guilds={renderedGuilds} />
    }

    if (nextPuzzle()) {
      const { type, guilds } = nextPuzzle()
      switch (type) {
        case Puzzles.LOGO:
          return <LogoGuessingGame key={game.activeStep} guilds={guilds} />
        case Puzzles.PAIRING:
          return <PairingGame />
        default:
          return null
      }
    } else return <GameResult />
  }

  return <>{getActiveComponent()}</>
}

export const getStaticProps: GetStaticProps = async () => {
  const guilds = await fetcher(`/guild?sort=members`)
    .then((list) => list)
    .catch((_) => [])

  return {
    props: { guilds },
    revalidate: 60,
  }
}

export default GameCoordinator
