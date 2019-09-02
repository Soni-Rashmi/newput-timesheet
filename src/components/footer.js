import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export const Footer = (() => {
  return (
    <div className='text-center footer'>
      <span> &copy; {new Date().getFullYear()} Newput Inc.</span>
    </div>
  );
});
