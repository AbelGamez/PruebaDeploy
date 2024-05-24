import React from 'react'
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai'


export const Item = ({ Links, title }) => {
  return (
    <div className='mb-8'>
      <h1 className='my-5 font-bold ' >{title}</h1>
      <ul>
        {
          Links.map((link) => (
            <li key={link.name} className='font font-thin'>
              {link.name === 'social' ?
                <div className='flex gap-4 items-center'>
                  {
                    link.links.map((Socialink) => {
                      switch (Socialink.name) {
                        case "Facebook":
                          return (
                            <a
                              key={Socialink.name}
                              href={Socialink.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <BsFacebook />
                            </a>
                          );
                        case "Twitter":
                          return (
                            <a
                              key={Socialink.name}
                              href={Socialink.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <AiFillTwitterCircle size={20} />
                            </a>
                          );
                        case "Instagram":
                          return (
                            <a
                              key={Socialink.name}
                              href={Socialink.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <BsInstagram />
                            </a>
                          );
                        default:
                          return null;
                      }
                    }

                    )
                  }
                </div>
                :
                <div className='cursor pointer'>
                  {link.name}
                </div>}

            </li>
          ))
        }
      </ul>
    </div>
  )
}
