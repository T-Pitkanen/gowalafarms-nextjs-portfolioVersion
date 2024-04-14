
import './globals.css'
import { robotoFont, frankRuhlLibreFont } from '@/utils/fonts';
import { BasketContextProvider } from '@/context/basket';


export const metadata = {
  title: 'Gowala Farms',
  description: 'Homepage for gowalafarms.dk',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoFont.variable} ${frankRuhlLibreFont.className}`}>
        {/* Context provider: Passing data down without having to pass props manually */}
      <BasketContextProvider>{children}</BasketContextProvider>
      </body>
    </html>
  )
}
