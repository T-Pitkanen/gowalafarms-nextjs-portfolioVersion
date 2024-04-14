'use client'
import { useWindowSize } from "@uidotdev/usehooks";
import NavigationBig from './navigationBig/navigationBig';
import NavigationMobile from './navigationMobile/navigationMobile';

const Navigation = () => {
  const size = useWindowSize();

  return (
    <>
      {size.width > 1024 ? <NavigationBig /> : <NavigationMobile />}
    </>
  );
};

export default Navigation;