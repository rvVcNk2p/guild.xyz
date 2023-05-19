import { Box, Text } from "@chakra-ui/react"
import { ThemeProvider } from "components/[guild]/ThemeContext"
import Layout from "components/common/Layout"
import { GameProvider } from "components/guess-the-guild/GameContext"
import { FC } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const PageWrapper: FC<DashboardLayoutProps> = ({
  children,
}: DashboardLayoutProps) => (
  <ThemeProvider>
    <GameProvider>
      <Layout
        title="Guess the Guild"
        background={"gray.500"}
        ogDescription="Embark on a mind-bending adventure to unravel guild names and images in Guild Guess, where intuition and knowledge collide."
        description={
          <Box>
            <Text fontSize="sm" colorScheme={"white"}>
              Welcome to Guild Guess, the ultimate game of wits and imagination!
              Embark on an exciting journey as you test your knowledge and intuition
              to unravel the captivating world of guilds.
            </Text>
          </Box>
        }
        backgroundOffset={200}
        maxWidth="container.sm"
      >
        {children}
      </Layout>
    </GameProvider>
  </ThemeProvider>
)

export default PageWrapper
