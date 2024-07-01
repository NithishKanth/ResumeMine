import React from 'react'
import Personal from './Personal'
import BoxSummary from './BoxSummary'
import BoxEducation from './BoxEducation'

const DataCards = ({info,fetchData}) => {
  console.log(info)
  return (
    <div className='flex flex-col  gap-3'>
      <Personal 
        info={info} 
        fetchData={fetchData}
      />
      <BoxSummary
          info={info} 
          fetchData={fetchData}
      />
      <BoxEducation 
        info={info} 
        fetchData={fetchData}
      />
    </div>
  )
}

export default DataCards