import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Row } from '../components/Row'

test('render the row', () => {
  const data = {
    title: 'blog title',
    author: 'blog author',
    url: 'www.blog.url',
    likes: ['123455677'],
  }

  const handleUpdate = () => {
    console.log('rendered')
  }

  const loggedInState = true

  render(
    <Row
      id={1}
      blog={data}
      handleUpdate={handleUpdate}
      loggedInState={loggedInState}
    />
  )

  const element = screen. getByText(data.title)
  expect(element).toBeDefined()
})
