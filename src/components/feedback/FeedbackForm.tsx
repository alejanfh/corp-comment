import { ChangeEvent, FormEvent, useState } from 'react'
import { MAX_CHARACTERS } from '../../lib/constants'

type FeedbackFormProps = {
  onAddToList: (text: string) => void
}

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState<string>('')

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
    onAddToList(text)

    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className='form'>
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
