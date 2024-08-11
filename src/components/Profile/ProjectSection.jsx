import React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import ProjectCard from './ProjectCard'

export default function ProjectSection() {
  return (
    <div className='text-gray-400 p-2 flex flex-col items-center'>
        <FaChevronUp />
        < ProjectCard />
        < ProjectCard />
        <FaChevronDown />
    </div>
  )
}
