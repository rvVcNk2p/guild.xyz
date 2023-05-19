import GameCoordinator from "components/guess-the-guild/GameCoordinator"
import CardWrapper from "components/guess-the-guild/wrappers/CardWrapper"
import PageWrapper from "components/guess-the-guild/wrappers/PageWrapper"

const GuessTheGamePage = (): JSX.Element => (
  <PageWrapper>
    <CardWrapper>
      <GameCoordinator />
    </CardWrapper>
  </PageWrapper>
)

export default GuessTheGamePage
