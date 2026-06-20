export default function Spinner({ fullPage = false }) {
  const wrapperStyle = fullPage
    ? { minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }
    : { display: 'flex', justifyContent: 'center', padding: '3rem' }

  return (
    <div style={wrapperStyle}>
      <div style={styles.spinner} />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

const styles = {
  spinner: {
    width: '28px',
    height: '28px',
    border: '3px solid #e5e7eb',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },
}