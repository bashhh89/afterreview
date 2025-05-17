import React from 'react'

function Error({ statusCode }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#F3FDF5'
    }}>
      <div style={{
        maxWidth: '500px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '24px',
          color: '#103138',
          marginBottom: '16px'
        }}>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '20px'
        }}>
          We apologize for the inconvenience. Our team has been notified of this issue.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            backgroundColor: '#20E28F',
            color: '#103138',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Return to Home
        </button>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 