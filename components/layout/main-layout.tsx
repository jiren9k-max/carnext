import { Header } from "./header"
import { Footer } from "./footer"
import { ScrollToTop } from "./scroll-to-top"
import { WhatsAppButton } from "./whatsapp-button"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
