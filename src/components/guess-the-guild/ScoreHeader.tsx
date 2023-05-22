import { Flex, Spacer, Text } from "@chakra-ui/react"
import useLocalStorage from "hooks/useLocalStorage"
import { GameType } from "./useGame"

type Props = {
  game: GameType
}

const ScoreHeader = ({ game }: Props) => {
  const [record] = useLocalStorage("record", null)

  const currentScore = game.currentScore !== null ? game.currentScore : "-"
  const activeStep =
    game.isGame && game.activeStep !== null ? game.activeStep + 1 : "-"
  const puzzleCount =
    game.isGame && game.puzzles?.length > 0 ? game.puzzles?.length : "-"

  return (
    <Flex justifyContent="center" mb={10}>
      <Text fontSize="sm">Record: {record ?? "-"}</Text>
      <Spacer />
      <Text fontSize="sm">Current score: {currentScore}</Text>
      <Spacer />
      <Text fontSize="sm">{activeStep + " / " + puzzleCount}</Text>
    </Flex>
  )
}

export default ScoreHeader
