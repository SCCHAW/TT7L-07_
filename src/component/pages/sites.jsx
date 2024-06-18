import React from 'react';

const Sites = () => {
  return (
    <div className="combined-sites-container">
      <div className="iframe-container">
        <iframe 
          src="https://www.lazada.com.my"
          title="Site One"
          width="100%"
          height="500px"
          style={{ border: 'none' }}
        ></iframe>
      </div>
      <div className="iframe-container">
        <iframe 
          src="https://www.lazada.com.my"
          title="Site Two"
          width="100%"
          height="500px"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};

export default Sites;
