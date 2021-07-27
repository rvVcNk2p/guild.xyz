import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { Link } from "components/common/Link"
import { CommunityProvider } from "components/community/Context"
import Levels from "components/community/Levels"
import Platforms from "components/community/Platforms"
import Staked from "components/community/Staked"
import Layout from "components/Layout"
import { GetStaticPaths, GetStaticProps } from "next"
import type { Community } from "temporaryData/communities"
import { communities } from "temporaryData/communities"

// Set this to true if you don't want the data to be fetched from backend
const DEBUG = false

type Props = {
  communityData: Community
}

const CommunityPage = ({ communityData }: Props): JSX.Element => (
  <CommunityProvider data={communityData}>
    <Layout title={`${communityData.name} community`}>
      <Stack spacing={{ base: 7, xl: 9 }}>
        <Text fontWeight="medium">{communityData.description}</Text>
        <SimpleGrid
          templateColumns={{ base: "100%", md: "3fr 2fr" }}
          gap={{ base: 5, md: 7, xl: 9 }}
        >
          <Platforms />
          <Staked />
        </SimpleGrid>
        <Box>
          <Levels />
        </Box>
        {/* <pre>{JSON.stringify(communityData, undefined, 2)}</pre> */}
        <Link href="/" pt={2}>
          Back to all communities
        </Link>
      </Stack>
    </Layout>
  </CommunityProvider>
)

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const localData = communities.find((i) => i.urlName === params.community)

  const communityData =
    DEBUG && process.env.NODE_ENV !== "production"
      ? localData
      : await fetch(
          `${process.env.NEXT_PUBLIC_API}/community/urlName/${params.community}`
        ).then((response: Response) => (response.ok ? response.json() : localData))

  if (!communityData) {
    return {
      notFound: true,
    }
  }

  return {
    props: { communityData },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const mapToPaths = (_: Community[]) =>
    _.map(({ urlName: community }) => ({ params: { community } }))

  const pathsFromLocalData = mapToPaths(communities)

  const paths =
    DEBUG && process.env.NODE_ENV !== "production"
      ? pathsFromLocalData
      : await fetch(`${process.env.NEXT_PUBLIC_API}/community`).then((response) =>
          response.ok ? response.json().then(mapToPaths) : pathsFromLocalData
        )

  return {
    paths,
    fallback: false,
  }
}

export default CommunityPage
