import { useState } from 'react'
import 'SearchedPage.css'
import { Quote } from '../components/QuoteInterface'

export function SearchedPage(author: string){
    const [quoteList, setQuoteList] = useState<Quote[] | null>(null)


}