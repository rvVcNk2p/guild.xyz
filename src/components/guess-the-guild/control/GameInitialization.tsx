import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react"

import { useState } from "react"
import { GuildBase } from "types"
import capitalize from "utils/capitalize"
import { Difficulties, Puzzle, PuzzleLength, Puzzles } from "../useGame"

type Props = {
  guilds: GuildBase[]
  isInitialFetch: boolean
  startGame: (difficulty: Difficulties, puzzles: Puzzle[]) => void
}

const shuffleArray = (array: GuildBase[]): GuildBase[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const generatePuzzles = (shuffledGuilds: GuildBase[]): Puzzle[] =>
  shuffledGuilds.reduce((result, _, index) => {
    if (index % 4 === 0) {
      result.push({
        guilds: shuffledGuilds.slice(index, index + 4),
        type: Math.random() < 0.5 ? Puzzles.PAIRING : Puzzles.LOGO,
      })
    }
    return result
  }, [])

const GameInitialization = ({
  guilds,
  isInitialFetch,
  startGame,
}: Props): JSX.Element => {
  const difficulties = Object.values(Difficulties)

  const [difficulty, setDifficulty] = useState<Difficulties>(Difficulties.EASY)

  const handleDifficultyChange = (newDifficulty: Difficulties): void => {
    setDifficulty(newDifficulty)
  }

  const handleStartGame = () => {
    const guildsSubset = [...guilds].slice(0, PuzzleLength[difficulty])
    const shuffledGuilds = shuffleArray([...guildsSubset])
    const puzzles = generatePuzzles(shuffledGuilds)

    startGame(difficulty, puzzles)
  }

  return (
    <Stack gap={6}>
      <Box>
        <Text fontSize="sm" colorScheme={"white"}>
          Welcome to Guild Guess, the ultimate game of wits and imagination! Embark
          on an exciting journey as you test your knowledge and intuition to unravel
          the captivating world of guilds.
        </Text>
      </Box>
      <Box>
        <Text mb={4}>
          The guilds will be selected from the top ranked guilds based on their
          community size. (Easy = Top 100, Medium = Top 500, Hard = Top 1000)
        </Text>
        <Text mb={4} fontWeight={600}>
          Select a difficulty level:{" "}
        </Text>
        <HStack>
          {difficulties.map((d: Difficulties, idx) => (
            <Button
              key={d + "-" + idx}
              onClick={() => handleDifficultyChange(d)}
              color={difficulty === d ? "blue.500" : null}
            >
              {capitalize(d)}
            </Button>
          ))}
        </HStack>
      </Box>
      <Button
        colorScheme="green"
        onClick={handleStartGame}
        isLoading={isInitialFetch}
        loadingText={"Initialization..."}
      >
        New Game
      </Button>
    </Stack>
  )
}

export default GameInitialization
