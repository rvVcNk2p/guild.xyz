import { useGameDispatch } from "../GameContext"

const GameResult = (): JSX.Element => {
  const dispatch = useGameDispatch()

  return <div>The end!</div>
}

export default GameResult
