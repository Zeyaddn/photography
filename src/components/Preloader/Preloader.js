"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={!loading ? "hidden" : ""}>
      <div className="preloader-inner">
        <div className="loader-camera">
          <i className='bx bx-camera'></i>
          <div className="loader-ring"></div>
        </div>
        <div className="loader-text">Lens of Creativity</div>
        <div className="loader-bar"><div className="loader-bar-fill"></div></div>
      </div>
    </div>
  );
}
