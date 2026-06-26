import { Header } from "./header"
import { Footer } from "./footer"
import { ScrollToTop } from "./scroll-to-top"
import { LoadingScreen } from "./loading-screen"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
