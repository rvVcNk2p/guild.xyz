import { Button, HStack, Stack, Text } from "@chakra-ui/react"
import { Puzzles, useGameDispatch } from "../GameContext"

import { useState } from "react"
import { GuildBase } from "types"
import capitalize from "utils/capitalize"
import { Difficulties, Puzzle, PuzzleLength } from "../GameContext"

type Props = {
  guilds: GuildBase[]
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

const GameInitialization = ({ guilds }: Props): JSX.Element => {
  const dispatch = useGameDispatch()
  const difficulties = Object.values(Difficulties)

  const [difficulty, setDifficulty] = useState<Difficulties>(Difficulties.EASY)

  const handleDifficultyChange = (newDifficulty: Difficulties): void => {
    setDifficulty(newDifficulty)
  }

  const handleStartGame = () => {
    const guildsSubset = [...guilds].slice(0, PuzzleLength[difficulty])
    const shuffledGuilds = shuffleArray([...guildsSubset])
    const puzzles = generatePuzzles(shuffledGuilds)

    dispatch({
      type: "start",
      difficulty,
      puzzles,
    })
  }

  return (
    <Stack gap={6}>
      <Text>Difficulty: </Text>
      <HStack>
        {difficulties.map((d: Difficulties, idx) => (
          <Button key={d + "-" + idx} onClick={() => handleDifficultyChange(d)}>
            {capitalize(d)}
          </Button>
        ))}
      </HStack>
      <Button onClick={handleStartGame}>New Game</Button>
    </Stack>
  )
}

export default GameInitialization
