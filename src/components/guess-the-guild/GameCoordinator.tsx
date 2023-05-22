import { GetStaticProps } from "next"
import { useMemo } from "react"
import useSWR from "swr"
import { GuildBase } from "types"
import fetcher from "utils/fetcher"
import GameInitialization from "./control/GameInitialization"
import GameResult from "./control/GameResult"
import LogoGuessingGame from "./games/LogoGuessingGame"
import PairingGame from "./games/PairingGame"
import { Puzzle, Puzzles, useGame } from "./useGame"

type Props = {
  guilds?: GuildBase[]
}

const GameCoordinator = ({ guilds: guildsInitial }: Props): JSX.Element => {
  const {
    data: [filteredGuilds],
    isValidating: isLoading,
  } = useSWR(
    "/guild??order=members",
    (url: string) =>
      fetcher(url).then((data) => [
        data,
        data.filter(
          (guild: GuildBase) =>
            (guild.platforms?.length > 0 &&
              guild.memberCount > 0 &&
              guild.imageUrl) ||
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

  const { game, startGame, evaluate, nextPuzzle, restartGame } = useGame()

  const getNextPuzzle = (): Puzzle | null => {
    if (game.puzzles.length > 0 && game.isGame) {
      return game.puzzles[game.activeStep]
    } else return null
  }

  const getActiveComponent = () => {
    if (!game.isGame) {
      return (
        <GameInitialization
          guilds={renderedGuilds}
          startGame={startGame}
          isInitialFetch={isLoading}
        />
      )
    }

    if (getNextPuzzle()) {
      const { type, guilds } = getNextPuzzle()

      switch (type) {
        case Puzzles.LOGO:
          return (
            <LogoGuessingGame
              key={game.activeStep}
              guilds={guilds}
              game={game}
              evaluate={evaluate}
              next={nextPuzzle}
            />
          )
        case Puzzles.PAIRING:
          return (
            <PairingGame
              key={game.activeStep}
              guilds={guilds}
              game={game}
              evaluate={evaluate}
              next={nextPuzzle}
            />
          )
        default:
          return null
      }
    } else
      return <GameResult currentScore={game.currentScore} restart={restartGame} />
  }

  return <>{getActiveComponent()}</>
}

export const getStaticProps: GetStaticProps = async () => {
  const guilds = await fetcher(`/guild?sort=members`)
    .then((list) => list)
    .catch((_) => [])

  return {
    props: { guilds },
    revalidate: 600,
  }
}

export default GameCoordinator
