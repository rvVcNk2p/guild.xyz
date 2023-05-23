import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useState } from "react"

import {
  Button,
  Center,
  Circle,
  Image,
  SimpleGrid,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react"
import { GameType } from "hooks/useGame"
import { GuildBase } from "types"
import ScoreHeader from "../ScoreHeader"
import Draggable from "../drag-and-drop/Draggable"
import DroppableCard from "../drag-and-drop/DroppableCard"

type Props = {
  guilds: GuildBase[]
  game: GameType
  evaluate: (value: number) => void
  next: () => void
}

type StateType = {
  [key: number]: null
}

export const emptyImage = (key: number) => (
  <Circle
    key={key}
    size="68px"
    bg="transparent"
    bgImage='url("/default_circle.svg")'
  />
)

const generateState = (guilds: GuildBase[]): StateType => {
  const ids = guilds.map((guild) => guild.id)
  return ids.reduce((acc: any, nextVal: number) => {
    acc[nextVal] = null
    return acc
  }, {})
}

const getGuildById = (guilds: GuildBase[], id: number) => {
  for (let i = 0; i < guilds.length; i++) {
    if (guilds[i].id == id) {
      return guilds[i]
    }
  }

  return null
}

const PairingGame = ({ guilds, game, evaluate, next }: Props): JSX.Element => {
  const droppableElementIds = guilds.map((guild) => guild.id)

  const [state, setState] = useState<StateType>(generateState(guilds))

  const isDisabled = () => Object.values(state).every((value) => value !== null)

  const draggableMarkup = (id: number) => (
    <Draggable id={`draggable-${id}`} key={id} style={{ zIndex: 12 }}>
      <Image
        width={68}
        height={68}
        rounded="full"
        src={getGuildById(guilds, id)?.imageUrl}
        fallback={<SkeletonCircle size="68" />}
        alt="Guild Icon"
      />
    </Draggable>
  )

  const getActiveDraggableElement = (id: number) => {
    for (const key in state) {
      if (state.hasOwnProperty(key) && state[key] === id) {
        return draggableMarkup(+key)
      }
    }

    return emptyImage(id)
  }

  const getSameActiveKey = (id: string): null | string =>
    Object.entries(state).reduce((acc: string, nextval) => {
      const [key, value] = nextval
      if (value == id) {
        acc = key
      }
      return acc
    }, null)

  const handleDragEnd = (event: DragEndEvent): void => {
    const { over, active } = event
    let updatedState = { ...state }

    const draggable = active.id.toString().split("-")[1]
    updatedState = { ...updatedState, [draggable]: over ? over.id : null }

    if (over?.id) {
      const sameActive = getSameActiveKey(over.id.toString())
      if (sameActive) {
        updatedState = { ...updatedState, [sameActive]: null }
      }
    }

    setState(updatedState)
  }

  const [validationState, setValidationState] = useState([null, null, null, null])

  const isEvaluationCompleted = () =>
    Object.values(validationState).every((value) => value !== null)

  const evaluateState = (): void => {
    const validationArray = Object.entries(state).reduce(
      (acc: boolean[], [key, value]) => {
        acc.push(key == value)
        return acc
      },
      []
    )

    const isResultValid = validationArray.every((entry) => entry)

    setValidationState(validationArray)

    evaluate(isResultValid ? 2 : 0)
  }

  return (
    <>
      <ScoreHeader game={game} />

      <DndContext onDragEnd={handleDragEnd}>
        <Center flexDir={"column"} pb="10" textAlign={"center"}>
          <Text mb="6" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} as="b">
            Pair the logos to their guilds
          </Text>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
            {/* <HStack gap={4} flex="1" justifyContent="center"> */}
            {Object.keys(state).map((key: string) =>
              state[key] === null ? draggableMarkup(+key) : emptyImage(+key)
            )}
            {/* </HStack> */}
          </SimpleGrid>
        </Center>

        <VStack gap={2} mb={10} flex="1" justifyContent="start" alignItems="start">
          {droppableElementIds.map((id, idx) => (
            <DroppableCard
              key={id}
              guild={getGuildById(guilds, id)}
              isCorrect={validationState[idx]}
            >
              {getActiveDraggableElement(id)}
            </DroppableCard>
          ))}
        </VStack>

        {isEvaluationCompleted() ? (
          <Button
            variant="solid"
            colorScheme="gray"
            size="md"
            onClick={() => next()}
          >
            Next
          </Button>
        ) : (
          <Button
            colorScheme="green"
            isDisabled={!isDisabled()}
            onClick={evaluateState}
          >
            Submit
          </Button>
        )}
      </DndContext>
    </>
  )
}

export default PairingGame
