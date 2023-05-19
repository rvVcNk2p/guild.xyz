import { Divider } from "@chakra-ui/react"
import CardWrapper from "components/guess-the-guild/CardWrapper"
import LogoGuesserGame from "components/guess-the-guild/LogoGuesserGame"
import NewGame from "components/guess-the-guild/NewGame"
import PageWrapper from "components/guess-the-guild/PageWrapper"
import PairingGame from "components/guess-the-guild/PairingGame"
import ScoreBoard from "components/guess-the-guild/ScoreBoard"
import { GetStaticProps } from "next"
import { useMemo } from "react"
import useSWR from "swr"
import { GuildBase } from "types"
import fetcher from "utils/fetcher"

type Props = {
  guilds: GuildBase[]
}

const GuessTheGamePage = ({ guilds: guildsInitial }: Props): JSX.Element => {
  const {
    data: [allGuilds, filteredGuilds],
    isValidating: isLoading,
  } = useSWR(
    "/guild??order=members",
    (url: string) =>
      fetcher(url).then((data) => [
        data,
        data.filter(
          (guild) =>
            (guild.platforms?.length > 0 && guild.memberCount > 0) ||
            guild.memberCount > 1
        ),
      ]),
    {
      fallbackData: [guildsInitial, guildsInitial],
      dedupingInterval: 60000, // one minute
    }
  )

  const renderedGuilds = useMemo(
    () => filteredGuilds?.slice(0, 1000) || [],
    [filteredGuilds]
  )

  return (
    <>
      <PageWrapper>
        <CardWrapper>
          <ScoreBoard />
          <NewGame guilds={renderedGuilds} />
          <Divider mt={5} mb={5} />
          <PairingGame />
          <Divider mt={5} mb={5} />
          <LogoGuesserGame guilds={renderedGuilds} />
        </CardWrapper>
      </PageWrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const guilds = await fetcher(`/guild?sort=members`)
    .then((list) => list)
    .catch((_) => [])

  return {
    props: { guilds },
    revalidate: 60,
  }
}

export default GuessTheGamePage
