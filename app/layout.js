import Navigation from './(components)/Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import {confif} from '@fortawesome/fontawesome-svg-core'
import "@fortawesome/fontawesome-svg-core/styles.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ticket App',
  description: 'Ticket app for RD',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex flex-col h-screen max-h-screen'>
        <Navigation/>
        <div className="flex-grow overflow-y-auto bg-page text-default-text">
        {children}</div>
        </div>
        </body>
    </html>
  )
}
