import { Button, Center, Image, SkeletonCircle, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { GuildBase } from "types"
import ScoreHeader from "../ScoreHeader"
import { GameType } from "../useGame"

type Props = {
  guilds: GuildBase[]
  game: GameType
  evaluate: (value: number) => void
  next: () => void
}

const getRandomNumber = (max: number): number => Math.floor(Math.random() * max)

const LogoGuessingGame = ({ guilds, game, evaluate, next }: Props): JSX.Element => {
  const [correctGuild] = useState<GuildBase>(guilds[getRandomNumber(guilds.length)])
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleSelectedGuild = (id: number) => {
    if (!validationState) setSelectedId(id)
  }

  const isCorrect = (): boolean => correctGuild.id === selectedId

  const [validationState, setValidationState] = useState<boolean>(false)

  const evaluateState = (): void => {
    setValidationState(true)

    evaluate(isCorrect() ? 1 : 0)
  }

  const validationClass = (id: number) => {
    if (!validationState) {
      if (selectedId === id) return "blue.500"
      else return null
    }

    if (id === selectedId && id !== correctGuild.id) {
      return "red.500"
    } else if (id === correctGuild.id) {
      return "green.500"
    } else return null
  }

  return (
    <>
      <ScoreHeader game={game} />

      <Center flexDir={"column"} pb="10" textAlign={"center"}>
        <Text mb="4" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} as="b">
          Guess the guild by the logo
        </Text>
        <Image
          width={120}
          height={120}
          src={correctGuild?.imageUrl}
          alt="Logo"
          fallback={<SkeletonCircle size="120" />}
        />
        <Text mt={4}>???</Text>
      </Center>
      <Stack spacing={4} mb={10} direction={"column"} align="stretch">
        {guilds.length &&
          guilds.map((guild: GuildBase) => (
            <Button
              key={guild.id}
              variant="solid"
              size="md"
              color={validationClass(guild.id)}
              onClick={() => handleSelectedGuild(guild.id)}
            >
              {guild.name}
            </Button>
          ))}
      </Stack>

      {validationState ? (
        <Button variant="solid" colorScheme="gray" size="md" onClick={() => next()}>
          Next
        </Button>
      ) : (
        <Button
          colorScheme="green"
          isDisabled={selectedId === null}
          onClick={evaluateState}
        >
          Submit
        </Button>
      )}
    </>
  )
}

export default LogoGuessingGame
