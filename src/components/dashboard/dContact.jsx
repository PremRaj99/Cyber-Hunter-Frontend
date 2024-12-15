// import React from 'react';

const dContact = () => {
  return (
    <div className='dContact'>
      <h2>CONTACT US</h2>
    <form action="" method="post">
      <input  type="text" name="fullName" id="fullName" required placeholder='Full Name'/>
      <input type="email" name="email" id="email" required placeholder='Email-Id'/>
      <input type="text" name="subject" id="subject" required placeholder='Subject'/>
      <textarea name="query" id="query" cols="30" rows="7"placeholder='Describe Your Query'>
      </textarea>
      <button type="submit" >Send</button>
    </form>
    </div>
  )
}

export default dContact