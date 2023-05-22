import { ThemeProvider } from "components/[guild]/ThemeContext"
import DisplayCard from "components/common/DisplayCard"
import Layout from "components/common/Layout"
import GameCoordinator from "components/guess-the-guild/GameCoordinator"

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

const GuessTheGamePage = (): JSX.Element => (
  <ThemeProvider>
    <Layout
      title="Guess the Guild"
      background={"gray.500"}
      ogDescription="Embark on a mind-bending adventure to unravel guild names and images in Guild Guess, where intuition and knowledge collide."
      backgroundOffset={200}
      maxWidth="container.sm"
    >
      <DisplayCard {...customCardProps}>
        <GameCoordinator />
      </DisplayCard>
    </Layout>
  </ThemeProvider>
)

export default GuessTheGamePage
