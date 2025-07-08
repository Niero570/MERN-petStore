import React from 'react';

const ImageTest = () => {
  const testImages = [
    'proChimp.png',
    'disTiger.jpeg', 
    'proWolf.jpeg'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Image Loading Test</h2>
      
      <h3>Testing different paths:</h3>
      
      {testImages.map(image => (
        <div key={image} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h4>{image}</h4>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <p>Path: /images/{image}</p>
              <img 
                src={`/images/${image}`} 
                alt={image}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                onError={() => console.log(`Failed to load /images/${image}`)}
                onLoad={() => console.log(`Successfully loaded /images/${image}`)}
              />
            </div>
            
            <div>
              <p>Path: ./images/{image}</p>
              <img 
                src={`./images/${image}`} 
                alt={image}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                onError={() => console.log(`Failed to load ./images/${image}`)}
                onLoad={() => console.log(`Successfully loaded ./images/${image}`)}
              />
            </div>
            
            <div>
              <p>Path: /public/images/{image}</p>
              <img 
                src={`/public/images/${image}`} 
                alt={image}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                onError={() => console.log(`Failed to load /public/images/${image}`)}
                onLoad={() => console.log(`Successfully loaded /public/images/${image}`)}
              />
            </div>
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: '30px' }}>
        <h3>Test Backend API Images:</h3>
        <p>Check console for fetch results</p>
        <button onClick={() => {
          fetch('/images/proChimp.png')
            .then(res => {
              console.log('Backend image fetch status:', res.status);
              return res.blob();
            })
            .then(blob => {
              console.log('Backend image blob size:', blob.size);
            })
            .catch(err => console.error('Backend image fetch error:', err));
        }}>
          Test Backend Image Fetch
        </button>
      </div>
    </div>
  );
};

export default ImageTest;