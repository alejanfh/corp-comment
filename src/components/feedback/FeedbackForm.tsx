import { ChangeEvent, FormEvent, useState } from 'react'
import { MAX_CHARACTERS } from '../../lib/constants'

type FeedbackFormProps = {
  onAddToList: (text: string) => void
}

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState<string>('')
  const [showValidIndicator, setShowValidIndicator] = useState<boolean>(false)
  const [showInvalidIndicator, setShowInvalidIndicator] =
    useState<boolean>(false)
  const charCount = MAX_CHARACTERS - text.length

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    if (newText.length > MAX_CHARACTERS) {
      return
    }
    setText(newText)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // basic validation
    if (text.includes('#') && text.length >= 5) {
      setShowValidIndicator(true)
      setTimeout(() => {
        setShowValidIndicator(false)
      }, 2000)
    } else {
      setShowInvalidIndicator(true)
      setTimeout(() => {
        setShowInvalidIndicator(false)
      }, 2000)
      return
    }

    onAddToList(text)
    setText('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator ? 'form--valid' : ''} ${
        showInvalidIndicator ? 'form--invalid' : ''
      }`}
    >
      <textarea
        onChange={handleChange}
        value={text}
        id='feedback-textarea'
        placeholder=''
        spellCheck={false}
      />

      <label htmlFor='feedback-textarea'>
        Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className='u-italic'>{charCount}</p>
        <button type='submit'>
          <span>Submit</span>
        </button>
      </div>
    </form>
  )
}
