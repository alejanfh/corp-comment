import { TFeedbackItem } from '../../lib/types'
import FeedbackList from '../feedback/FeedbackList'
import Header from './Header'

type Containerprops = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  handleAddToList: (text: string) => void
}

export default function Container({
  feedbackItems,
  isLoading,
  errorMessage,
  handleAddToList,
}: Containerprops) {
  return (
    <main className='container'>
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  )
}
