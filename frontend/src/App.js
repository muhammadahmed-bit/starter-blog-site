import React, { useState, useEffect } from 'react';

function App() {
  // 1. Memory Storage (State)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Triggering the Data Fetch
  useEffect(() => {
    // Grab the URL we saved in the .env file
    const apiUrl = process.env.REACT_APP_WORDPRESS_API_URL;

    // Send an HTTP GET request to the WordPress API
    fetch(apiUrl)
      .then((response) => response.json()) // Convert raw network data into a readable JavaScript Object
      .then((data) => {
        setPosts(data); // Save the articles into our component memory
        setLoading(false); // Turn off the loading message
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); // The empty brackets [] mean: "Only run this code ONCE when the web page first loads"

  // 3. What the User Sees
  if (loading) {
    return <div style={{ padding: '20px', fontSize: '20px' }}>Loading articles...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Latest Blog Posts</h1>
      
      {/* Loop through our array of posts and display each one */}
      {posts.map((post) => (
        <article key={post.id} style={{ margin: '40px 0', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
          {/* WordPress delivers text with raw HTML tags, so we render them safely */}
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} style={{ color: '#0056b3' }} />
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} style={{ lineHeight: '1.6' }} />
        </article>
      ))}
    </div>
  );
}

export default App;