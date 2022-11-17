import { useState, useEffect } from 'react';

export default function useCheckMobile() {
  const [mobile, setMobile] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    width > 640 ? setMobile(false) : setMobile(true);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);
  return mobile;
}
