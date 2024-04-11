import { useEffect, useMemo, useState } from 'react'
import Container from './layout/Container'
import Footer from './layout/Footer'
import HashtagList from './hashtag/HashtagList'
import { TFeedbackItem } from '../lib/types'

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [selectedCompany, setSelectedCompany] = useState<string>('')

  // Lo mismo que useEffect pero para funciones
  // Que solo se renderice de nuevo cada vez que cambie feedbackItems o selectedCompany
  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  )

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index
        }),
    [feedbackItems]
  )

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(' ')
      .find((word) => word.includes('#'))!
      .substring(1)

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      company: companyName,
      text: text,
      daysAgo: 0,
    }

    setFeedbackItems([...feedbackItems, newItem])

    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
  }

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company)
  }

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
        )

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        setFeedbackItems(data.feedbacks)
      } catch (error) {
        setErrorMessage('Something went wrong. Please try agains later.')
      }
      setIsLoading(false)
    }

    fetchFeedbackItems()
  }, [])

  return (
    <div className='app'>
      <Footer />

      <Container
        feedbackItems={filteredFeedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />

      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  )
}

export default App
