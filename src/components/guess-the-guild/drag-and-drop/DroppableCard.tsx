import {
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  VStack,
  Wrap,
  useColorMode,
} from "@chakra-ui/react"
import { useDroppable } from "@dnd-kit/core"
import DisplayCard from "components/common/DisplayCard"
import { Users } from "phosphor-react"
import { GuildBase } from "types"
import pluralize from "utils/pluralize"

type DroppableCardProps = {
  guild: GuildBase
  isCorrect: boolean | null
  children: React.ReactNode
}

const DroppableCard = ({
  guild,
  isCorrect,
  children,
}: DroppableCardProps): JSX.Element => {
  const { colorMode } = useColorMode()

  const { setNodeRef } = useDroppable({
    id: guild.id,
  })

  const customCardProps = {
    _before: {
      position: "relative",
    },
    overflow: "visible",
    bg: colorMode === "light" ? "white" : "gray.600",
    py: "3",
  }

  const validationClass = () =>
    isCorrect === null ? null : isCorrect ? "green.500" : "red.500"

  return (
    <DisplayCard {...customCardProps}>
      <SimpleGrid
        templateColumns={"6rem calc(100% - 4.25rem)"}
        gap={4}
        alignItems="center"
      >
        <div ref={setNodeRef} style={{ zIndex: 10 }}>
          {children}
        </div>
        <VStack spacing={2} alignItems="start" w="full" maxW="full" mb="1" mt="-1">
          <Text
            as="span"
            fontFamily="display"
            fontSize="xl"
            color={validationClass()}
            fontWeight="bold"
            letterSpacing="wide"
            maxW="full"
            noOfLines={1}
          >
            {guild.name}
          </Text>
          <Wrap zIndex="1">
            <Tag as="li">
              <TagLeftIcon as={Users} />
              <TagLabel>
                {new Intl.NumberFormat("en", { notation: "compact" }).format(
                  guild.memberCount ?? 0
                )}
              </TagLabel>
            </Tag>
            <Tooltip label={guild.roles.join(", ")}>
              <Tag as="li">
                <TagLabel>{pluralize(guild.roles?.length ?? 0, "role")}</TagLabel>
              </Tag>
            </Tooltip>
          </Wrap>
        </VStack>
      </SimpleGrid>
    </DisplayCard>
  )
}

export default DroppableCard
