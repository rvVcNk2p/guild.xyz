import { createContext, useContext, useReducer } from "react"
import { GuildBase } from "types"

export enum Puzzles {
  PAIRING = "pairing",
  LOGO = "logo",
}

export enum Difficulties {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const PuzzleLength = {
  [Difficulties.EASY]: 20,
  [Difficulties.MEDIUM]: 500,
  [Difficulties.HARD]: 1000,
}

type DifficultyType = (typeof Difficulties)[keyof typeof Difficulties]
type PuzzleType = (typeof Puzzles)[keyof typeof Puzzles]

export type Puzzle = {
  guilds: [GuildBase, GuildBase, GuildBase, GuildBase]
  type: PuzzleType
}

type GameType = {
  puzzles: Puzzle[]
  isGame: boolean
  difficulty: DifficultyType
  activeStep: number
  currentScore: number | null
  highscore: number | null
}

const initialGameState: GameType = {
  puzzles: [],
  isGame: false,
  difficulty: Difficulties.EASY,
  activeStep: 0,
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
      const { difficulty, puzzles } = action

      return {
        ...game,
        isGame: true,
        currentScore: 0,
        difficulty,
        puzzles,
      }
    }
    case "increment": {
      // TODO: end the game
      return {
        ...game,
        currentScore: game.currentScore + action.value,
        activeStep: ++game.activeStep,
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
