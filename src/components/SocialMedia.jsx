import React from 'react'

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";


const SocialMedia = () => {
  return (
    <div className='app__social'>
      <div><FaSquareXTwitter/></div>
      <div><FaLinkedin/></div>
      <div><FaGithubSquare/></div>
      <div><FaMedium/></div>
      <div><FaYoutube/></div>
    </div>
  )
}

export default SocialMedia
