import React from 'react'

const Categoryform = ({handleSubmit,value,setValue}) => {
    
  return (
    <>
     <form onSubmit={handleSubmit}>
  <div className="mb-3 d-flex">
    <input type="text" class="form-control" placeholder='Enter new category' value={value} onChange={(e)=>setValue(e.target.value)}/>
  <button type="submit" className="btn btn-primary ms-2">Submit</button>
  </div>

</form> 
    </>
  )
}

export default Categoryform
