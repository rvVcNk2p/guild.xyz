import { Button, Center, Stack, Text } from "@chakra-ui/react"
import { useGameDispatch } from "components/guess-the-guild/GameContext"
import Image from "next/image"
import { GuildBase } from "types"

type Props = {
  guilds: GuildBase[]
}

const LogoGuesserGame = ({ guilds }: Props): JSX.Element => {
  const dispatch = useGameDispatch()

  return (
    <>
      <Center flexDir={"column"} pb="10" textAlign={"center"}>
        <Text mb="4" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} as="b">
          Guess the guild by the logo
        </Text>
        <Image width={120} height={120} src={guilds[0]?.imageUrl} alt="Logo" />
        <Text mt={4}>???</Text>
      </Center>
      <Stack spacing={4} direction={"column"} align="stretch">
        {guilds.length &&
          guilds.map((guild: GuildBase) => (
            <Button
              key={guild.id}
              variant="solid"
              size="md"
              onClick={() => dispatch({ type: "increment", value: 2 })}
            >
              {guild.name}
            </Button>
          ))}
        <Button
          h="10"
          flexShrink="0"
          isDisabled
          colorScheme="green"
          isLoading={false}
          loadingText="Loading"
        >
          Submit
        </Button>
      </Stack>
    </>
  )
}

export default LogoGuesserGame
