import { Roboto, Frank_Ruhl_Libre, Quicksand } from 'next/font/google'

export const robotoFont = Roboto({
    weight: ['400', '500', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export const frankRuhlLibreFont = Frank_Ruhl_Libre({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-frank',
});