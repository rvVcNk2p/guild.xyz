import { Flex, Spacer, Text } from "@chakra-ui/react"
import { useGame } from "components/guess-the-guild/GameContext"

const ScoreHeader = () => {
  const game = useGame()

  const currentScore = game.currentScore !== null ? game.currentScore : "-"
  const activeStep =
    game.isGame && game.activeStep !== null ? game.activeStep + 1 : "-"
  const puzzleCount =
    game.isGame && game.puzzles?.length > 0 ? game.puzzles?.length : "-"

  return (
    <Flex minWidth="max-content" mb={4}>
      <Text fontSize="sm">{activeStep + " / " + puzzleCount}</Text>
      <Spacer />
      <Text fontSize="sm">Current score: {currentScore}</Text>
    </Flex>
  )
}

export default ScoreHeader
