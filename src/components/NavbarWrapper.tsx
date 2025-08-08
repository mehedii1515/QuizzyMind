import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./Navbar'), {
  ssr: false,
  loading: () => <div className="h-16"></div> // Placeholder while loading
});

export default Navbar;
