import { Button, HStack, Stack, Text } from "@chakra-ui/react"
import { useGameDispatch } from "./GameContext"

import { useState } from "react"
import { GuildBase } from "types"
import capitalize from "utils/capitalize"
import { Difficulties, PuzzleLength } from "./GameContext"

type Props = {
  guilds: GuildBase[]
}

const NewGame = ({ guilds }: Props): JSX.Element => {
  const dispatch = useGameDispatch()
  const difficulties = Object.values(Difficulties)

  const [difficulty, setDifficulty] = useState<Difficulties>(Difficulties.EASY)

  const handleDifficultyChange = (newDifficulty: Difficulties): void => {
    setDifficulty(newDifficulty)
  }

  const handleStartGame = () => {
    const randomizedGuilds = [...guilds].sort() // TODO: Random sort
    const remainingGuilds = randomizedGuilds.slice(0, PuzzleLength[difficulty])

    dispatch({
      type: "start",
      difficulty,
      remainingGuilds,
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

export default NewGame
