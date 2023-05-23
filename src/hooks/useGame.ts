import useLocalStorage from "hooks/useLocalStorage"
import { useState } from "react"
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
  [Difficulties.EASY]: 100,
  [Difficulties.MEDIUM]: 500,
  [Difficulties.HARD]: 1000,
}

type DifficultyType = (typeof Difficulties)[keyof typeof Difficulties]
type PuzzleType = (typeof Puzzles)[keyof typeof Puzzles]

export type Puzzle = {
  guilds: [GuildBase, GuildBase, GuildBase, GuildBase]
  type: PuzzleType
}

export type GameType = {
  puzzles: Puzzle[]
  isGame: boolean
  difficulty: DifficultyType
  activeStep: number
  currentScore: number | null
}

const initialGameState: GameType = {
  puzzles: [],
  isGame: false,
  difficulty: Difficulties.EASY,
  activeStep: 0,
  currentScore: null,
}

export const useGame = () => {
  const [game, setGame] = useState<GameType>({ ...initialGameState })
  const [record, setRecord] = useLocalStorage("record", null)

  const startGame = (difficulty: Difficulties, puzzles: Puzzle[]) => {
    setGame({
      ...game,
      isGame: true,
      currentScore: 0,
      difficulty,
      puzzles,
    })
  }

  const evaluate = (value: number) => {
    const { activeStep, puzzles, currentScore } = game
    if (value === 0 || activeStep + 1 === puzzles.length) {
      const newScore = currentScore + value
      if (record < newScore) setRecord(newScore)
    }

    setGame({
      ...game,
      currentScore: value > 0 ? game.currentScore + value : 0,
    })
  }

  const nextPuzzle = () => {
    setGame({
      ...game,
      activeStep: ++game.activeStep,
    })
  }

  const restartGame = () => {
    setGame({ ...initialGameState })
  }

  return {
    game,

    startGame,
    evaluate,
    nextPuzzle,
    restartGame,
  }
}
