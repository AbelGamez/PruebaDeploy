import React from 'react';

const PlainText = ({ text, ...rest }) => {
  return (
    <p {...rest}>
      {text}
    </p>
  );
};

export default PlainText;