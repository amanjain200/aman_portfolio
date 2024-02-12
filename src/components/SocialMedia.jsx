import React from "react";

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <a href="https://twitter.com/the_aman_jain" target="_blank">
        <FaSquareXTwitter />
      </a>
      <a href="https://www.linkedin.com/in/the-aman-jain/" target="_blank">
        <FaLinkedin />
      </a>
      <a href="https://github.com/amanjain200" target="_blank">
        <FaGithubSquare />
      </a>
      <a href="https://medium.com/@amanjain189200" target="_blank">
        <FaMedium />
      </a>
      <a
        href="https://www.youtube.com/channel/UC9-p1XyXbpa70xSMhDYqFyg"
        target="_blank"
      >
        <FaYoutube />
      </a>
    </div>
  );
};

export default SocialMedia;
