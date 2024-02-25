import React from 'react'

const Spinner = () => {
  return (
    <div className='d-flex justifiy-content-center'>
        <div className='spinner-border' role='status'>
            <span className='sr-only text-center'></span>
        </div>
    </div>
  )
}

export default Spinner