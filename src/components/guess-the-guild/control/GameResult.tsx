import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import useLocalStorage from "hooks/useLocalStorage"

type Props = {
  currentScore: number
  restart: () => void
}

const GameResult = ({ restart, currentScore }: Props): JSX.Element => {
  const [record] = useLocalStorage("record", null)

  return (
    <Flex direction="column" alignItems="center" justifyItems="center">
      <Heading as="h1">Congratulations! 🎉</Heading>
      <Heading as="h2">You've completed the challenge!</Heading>
      <Text mt={10} fontSize="2xl">
        Here are your final results:
      </Text>
      <Text fontSize="xl">
        <strong>Record</strong>: {record}
      </Text>
      <Text fontSize="xl">
        <strong>End Score</strong>: {currentScore}
      </Text>

      <Heading as="h3" my={10}>
        Thank you for playing!
      </Heading>

      <Button colorScheme="green" onClick={restart}>
        Play again
      </Button>
    </Flex>
  )
}

export default GameResult
