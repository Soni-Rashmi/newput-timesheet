import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export const Footer = (() => {
  return (
    <Row componentClass='div'>
      <Col xs={12} componentClass='div' className='text-center footer'>
        <span> &copy; {new Date().getFullYear()} Newput Inc.</span>
      </Col>
    </Row>
  );
});
