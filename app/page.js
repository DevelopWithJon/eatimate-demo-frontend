import SplashNavBar from '@components/SplashNavBar.js';
import SignUpButton from '@components/SplashSignUpButton';

export default function Page() {
  return (
    <div className='xlg:bg-splash-background-xlarge xs: h-full w-auto bg-splash-background-small bg-cover bg-[center_top] bg-no-repeat sm:bg-splash-background-medium lg:bg-splash-background-large xl:bg-[center_top_-4rem]'>
      <div className='h-full w-full bg-black bg-opacity-5'>
        {/* Navigation */}
        <SplashNavBar />

        {/* Hero Statement */}
        <div className='pl-32 pt-36'>
          <h1 className='font-inter text-6xl font-black text-light-secondary'>
            Prospecting
          </h1>
          <h1 className='font-inter text-6xl font-black text-light-secondary'>
            Made Simple.
          </h1>
          <SignUpButton />
        </div>

        {/* Footer */}
        <div className='absolute bottom-0 flex w-full flex-row items-center justify-center gap-6 pb-3'>
<<<<<<< HEAD
        <p className="mb-2">© {new Date().getFullYear()} EstiMate. All rights reserved.</p>
          <a href='privacy-policy' className='text-white'>
=======
          <p className='text-white'>
            Copyright © 2024 EstiMate - All Rights Reserved
          </p>
          <a href='#' className='text-white'>
>>>>>>> 7f1fe6d483b3580b1d12e3b284685f4b1b690054
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
