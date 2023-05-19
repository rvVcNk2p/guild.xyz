import { Flex, Spacer, Text } from "@chakra-ui/react"
import { useGame } from "components/guess-the-guild/GameContext"

const ScoreBoard = () => {
  const game = useGame()
  const highscore = game.highscore !== null ? game.highscore : "-"
  const currentScore = game.currentScore !== null ? game.currentScore : "-"

  return (
    <Flex minWidth="max-content" mb={4}>
      <Text fontSize="sm">Highscore: {highscore}</Text>
      <Spacer />
      <Text fontSize="sm">Current score: {currentScore}</Text>
    </Flex>
  )
}

export default ScoreBoard
