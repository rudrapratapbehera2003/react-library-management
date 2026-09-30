import React, { useEffect, useState, useRef } from "react";
import "../css/home.css";

const images = [
  "https://media.gettyimages.com/id/948253326/video/planet-earth-from-the-space-station-4k.jpg?s=640x640&k=20&c=KqLg2D2A3Bz29co9QKEyRzZaNM5t6bmnG8JknDZOF0g=",
  "https://wallpapercat.com/w/full/8/4/0/1323523-2560x1600-desktop-hd-geography-background-photo.jpg",
  "https://w0.peakpx.com/wallpaper/712/406/HD-wallpaper-old-india-india-old-people.jpg",
  "https://prd-sc102-cdn.rtx.com/-/media/rtx/our-company/who-we-are/bbn/synthetic-biology/images/21ris225_ris_ai-landingpageimagery_syntheticbio.jpg?w=1600",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dS5nPVga3U78hKHFOPWSjn2EW-q2Dem0h1SIv3GSxBfLg5CMlzGDFLItPmEFZxW1yzw&usqp=CAU",
];

const texts = [
  "Welcome to the Smart Library Management System.",
  "Track and manage books with ease.",
  "Explore scientific journals and historic archives.",
  "Discover geographical and biological resources.",
  "Browse futuristic space and architecture content.",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const [error, setError] = useState(null);
  const [books, setBook] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const type = () => {
      const fullText = texts[textIndexRef.current];
      if (charIndexRef.current <= fullText.length) {
        setDisplayedText(fullText.slice(0, charIndexRef.current));
        charIndexRef.current++;
        setTimeout(type, 50);
      } else {
        charIndexRef.current = 0;
        textIndexRef.current = (textIndexRef.current + 1) % texts.length;
        setTimeout(type, 7000);
      }
    };
    type();
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/access/books")
      .then((response) => {
        if (!response.ok) {
          setError("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBook(data);
      })
      .catch((error) => {
        console.log("error in fetching data", error);
        setError(error.message);
      });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 left-panel">
            <div
              className="image-overlay"
              style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
            ></div>
            <div className="typing-text">
              <span>{displayedText}</span>
              <span className="typing-cursor"></span>
            </div>
          </div>

          <div className="col-md-6 right-panel">
            <h2 style={{textAlign:"center",color:"white"}}>Available Books</h2>
            <div className="book-container mb-4">
              {error && 
              <div className="alert alert-danger">{error}</div>
              }
            <div className="card-scroll">
              {Array.isArray(books) && books.map((book) => (
                  <div className="card" key={book.id}
                  style={{
                    animationDelay: '0.1s',
                    backgroundColor: "#673465",
                    color: "white"
                  }}>
                      <div className="card-body fade-card" >
                        <h5 className="card-title" style={{color:"#0df86b"}}>
                          {book.name}
                        </h5>
                        <h6 className="card-text">
                          Author {book.author}
                        </h6>
                        <h6 className="card-text" >
                          Publication: {book.publication}
                        </h6>
                        <h6 className="card-text">
                          Year: {book.year}
                        </h6>
                      </div>
                      <button type="button" className ="btn btn-primary mb-2">
                        MakeChit
                      </button>
                    </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
