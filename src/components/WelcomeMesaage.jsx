import React from 'react';
import { m } from 'framer-motion';

const WelcomeMessage = () => {
  return (
    <m.p
      className='text-sm text-white leading-5 w-full'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      Write in the chat what you want to create.
    </m.p>
  );
};

export default WelcomeMessage;
