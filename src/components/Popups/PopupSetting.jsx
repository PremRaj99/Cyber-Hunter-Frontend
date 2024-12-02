import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";

function PopupSetting() {
  return (
    <div  className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gap-5 text-black h-auto w-2/4'>
           <button className='place-self-end'><IoMdCloseCircle size={30}/></button>
           <div className='bg-cyan-300 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4 h-auto'>
            <h3 className='text-3xl font-bold'>Edit Social Links</h3>

            <form>
                <div className="flex items-center space-x-2 float-left my-1">
                <img className="w-6 h-6 object-cover hover:scale-105 cursor-pointer rounded-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="" />
                <label htmlFor="linked" className='float-left font-bold'>Linkedin</label>
                </div>
                <input type="url" id='linked' placeholder='Enter url' className='w-full px-4 py-3 text-white bg-black rounded-md'/>
                
                <div className="flex items-center space-x-2 float-left my-1">
                <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/800px-Instagram_logo_2022.svg.png" alt="" />
                <label htmlFor="insta" className='float-left font-bold'>Instagram</label>
                </div>
                <input type="url" id='insta' placeholder='Enter url' className='w-full px-4 py-3 text-white bg-black rounded-md'/>

                <div className="flex items-center space-x-2 float-left my-1">
                <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer bg-gray-300 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png" alt="" />
                <label htmlFor="git" className='float-left font-bold'>Github</label>
                </div>
                <input type="url" id='git' placeholder='Enter url' className='w-full px-4 py-3 text-white bg-black rounded-md'/>

                <div className="flex items-center space-x-2 float-left my-1">
                <img className="w-8 h-8 object-cover hover:scale-105 cursor-pointer" src="https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png" alt="" />
                <label htmlFor="twitter" className='float-left font-bold'>Twitter</label>
                </div>
                <input type="url" id='twitter' placeholder='Enter url' className='w-full px-4 py-3 text-white bg-black rounded-md'/>
               
                
                <button className='mt-3 font-medium rounded-md bg-green-500 py-2 px-8'>Save</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default PopupSetting