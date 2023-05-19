import { Button, Center, Stack, Text } from "@chakra-ui/react"
import { useGameDispatch } from "components/guess-the-guild/GameContext"
import Image from "next/image"
import { useState } from "react"
import { GuildBase } from "types"
import ScoreHeader from "../ScoreHeader"

type Props = {
  guilds: GuildBase[]
}

const getRandomNumber = (max: number): number => Math.floor(Math.random() * max)

const LogoGuessingGame = ({ guilds }: Props): JSX.Element => {
  const [correctGuild] = useState<GuildBase>(guilds[getRandomNumber(guilds.length)])
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleSelectedGuild = (id: number) => setSelectedId(id)

  const isCorrect = (): boolean => correctGuild.id === selectedId

  const dispatch = useGameDispatch()

  return (
    <>
      <ScoreHeader />

      <Center flexDir={"column"} pb="10" textAlign={"center"}>
        <Text mb="4" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} as="b">
          Guess the guild by the logo
        </Text>
        <Image width={120} height={120} src={correctGuild?.imageUrl} alt="Logo" />
        <Text mt={4}>???</Text>
      </Center>
      <Stack spacing={4} direction={"column"} align="stretch">
        {guilds.length &&
          guilds.map((guild: GuildBase) => (
            <Button
              key={guild.id}
              variant="solid"
              size="md"
              onClick={() => handleSelectedGuild(guild.id)}
            >
              {guild.name}
            </Button>
          ))}
        <Button
          h="10"
          flexShrink="0"
          isDisabled={!selectedId}
          colorScheme="green"
          isLoading={false}
          loadingText="Loading"
          onClick={() => dispatch({ type: "increment", value: isCorrect() ? 1 : 0 })}
        >
          Submit
        </Button>
      </Stack>
    </>
  )
}

export default LogoGuessingGame
