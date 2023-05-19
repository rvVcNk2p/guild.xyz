import DisplayCard from "components/common/DisplayCard"
import { PropsWithChildren } from "react"

const customCardProps = {
  _before: {
    position: "relative",
  },
  _hover: {
    _before: {
      opacity: 0,
    },
  },
  _active: {
    _before: {
      opacity: 0,
    },
  },
}

const CardWrapper = ({ children }: PropsWithChildren<any>): JSX.Element => (
  <DisplayCard {...customCardProps}>{children}</DisplayCard>
)

export default CardWrapper
