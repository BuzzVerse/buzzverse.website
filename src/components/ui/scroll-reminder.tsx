import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ScrollReminder = () => {
  return (
    <div className='absolute pt-10 animate-bounce'>
      <Link href='#globe' passHref legacyBehavior>
        <a> {/* Keep the <a> tag for accessibility */}
          <Image
            src='/icons8-down-64.png'
            alt='scroll down'
            width={50}
            height={50}
            style={{ width: '50px', height: '50px' }}
          />
        </a>
      </Link>
    </div>
  )
}

export default ScrollReminder