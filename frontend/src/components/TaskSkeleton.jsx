export default function TaskSkeleton() {
    return (
      <div>
        {[1, 2, 3].map((i) => (
          <div key={i} style={styles.card}>
            <div style={{ ...styles.bar, width: '60%', height: '16px' }} />
            <div style={{ ...styles.bar, width: '90%', height: '12px', marginTop: '10px' }} />
            <div style={{ ...styles.bar, width: '40%', height: '12px', marginTop: '6px' }} />
          </div>
        ))}
        <style>{`
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        `}</style>
      </div>
    )
  }
  
  const styles = {
    card: {
      background: '#fff',
      borderRadius: '10px',
      padding: '1.1rem 1.25rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
      marginBottom: '0.75rem',
    },
    bar: {
      background: '#e5e7eb',
      borderRadius: '4px',
      animation: 'pulse 1.4s ease-in-out infinite',
    },
  }