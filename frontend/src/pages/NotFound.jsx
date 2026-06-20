import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>404</h1>
      <p style={{ color: '#666', marginBottom: '1rem' }}>Page not found</p>
      <Link to="/">Go back home</Link>
    </div>
  )
}