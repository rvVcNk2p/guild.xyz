import { createContext, useContext, useReducer } from "react"
import { GuildBase } from "types"

export enum Difficulties {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const PuzzleLength = {
  [Difficulties.EASY]: 2,
  [Difficulties.MEDIUM]: 4,
  [Difficulties.HARD]: 5,
}

type DifficultyType = (typeof Difficulties)[keyof typeof Difficulties]

type GameType = {
  remainingGuilds: GuildBase[]
  isGame: boolean
  difficulty: DifficultyType
  currentScore: number | null
  highscore: number | null
}

const initialGameState: GameType = {
  remainingGuilds: [],
  isGame: false,
  difficulty: Difficulties.EASY,
  currentScore: null,
  highscore: null,
}

const GameContext = createContext({ ...initialGameState })
const GameDispatchContext = createContext(null)

export function GameProvider({ children }) {
  const [game, dispatch] = useReducer(gameReducer, initialGameState)

  // TODO: Initialize all time high on mount from local storage
  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)
}

export function useGameDispatch() {
  return useContext(GameDispatchContext)
}

function gameReducer(game: GameType, action) {
  switch (action.type) {
    case "start": {
      const { difficulty, remainingGuilds } = action

      return {
        ...game,
        isGame: true,
        currentScore: 0,
        difficulty,
        remainingGuilds,
      }
    }
    case "increment": {
      return {
        ...game,
        currentScore: game.currentScore + action.value, // TODO: +1 or +2, depends
      }
    }
    case "restart": {
      return { ...initialGameState }
    }
    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}
