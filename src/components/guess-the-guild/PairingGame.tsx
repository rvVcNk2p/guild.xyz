import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useState } from "react"

import { HStack } from "@chakra-ui/react"
import { Draggable } from "./teeest/Draggable"
import { Droppable } from "./teeest/Droppable"

export default function PairingGame() {
  const containers = ["A", "B", "C", "D"]

  const [parent, setParent] = useState({
    first: null,
    second: null,
    third: null,
    forth: null,
  })

  const draggableMarkup = (key: string) => (
    <Draggable id={`draggable-${key}`} key={key}>
      <p>Drag me - {key}</p>
    </Draggable>
  )

  const getActiveDraggableElement = (id: string) => {
    // TODO: Refactor
    if (parent.first === id) {
      return draggableMarkup("first")
    } else if (parent.second === id) {
      return draggableMarkup("second")
    } else if (parent.third === id) {
      return draggableMarkup("third")
    } else if (parent.forth === id) {
      return draggableMarkup("forth")
    } else return `${id} - Drop here`
  }

  const getSameActiveKey = (id: string): null | string =>
    Object.entries(parent).reduce((acc: string, nextval) => {
      const [key, value] = nextval
      if (value === id) {
        acc = key
      }
      return acc
    }, null)

  const handleDragEnd = (event: DragEndEvent): void => {
    const { over, active } = event
    let updatedParent = { ...parent }

    const draggable = active.id.toString().split("-")[1]
    updatedParent = { ...updatedParent, [draggable]: over ? over.id : null }

    if (over?.id) {
      const sameActive = getSameActiveKey(over.id.toString())
      if (sameActive) {
        updatedParent = { ...updatedParent, [sameActive]: null }
      }
    }

    setParent(updatedParent)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <HStack gap={4} mb={10}>
        {Object.keys(parent).map((key: string) =>
          parent[key] === null ? draggableMarkup(key) : <div key={key}>DEFAULT</div>
        )}
      </HStack>

      {containers.map((id) => (
        <Droppable key={id} id={id}>
          {getActiveDraggableElement(id)}
        </Droppable>
      ))}
    </DndContext>
  )
}
