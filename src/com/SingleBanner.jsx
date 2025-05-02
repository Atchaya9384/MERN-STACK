import React from 'react';

const SingleBanner = ({ bannerimage, heading }) => {
  return (
    <div className='singlebanner'>
      <div className='bannerimgfilter'></div>
      <img className='bannerimg' src={bannerimage} alt='noimg' />
      <div className='bannerheading'>
        <h1>{heading}</h1>
      </div>
      <style>
        {`
          .singlebanner {
            position: relative;
            width: 100%;
            height: 50vh;
            overflow: hidden;
          }

          .singlebanner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .singlebanner .bannerimgfilter {
            background-color: rgba(0, 0, 0, 0.476);
            width: 100%;
            height: 100%;
            position: absolute;
          }

          .singlebanner .bannerheading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .singlebanner .bannerheading h1 {
            color: white;
            font-size: 90px;
            font-weight: 100;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }

          @media (max-width: 768px) {
            .singlebanner .bannerheading h1 {
              font-size: 50px;
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SingleBanner;
