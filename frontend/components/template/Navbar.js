import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const logoutAction = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <nav className="bg-blue-700 p-4 shadow-md fixed w-full z-10 top-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/notes">
          <div className="text-white text-lg font-semibold cursor-pointer">NotesManagementApp</div>
        </Link>
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <Link href="/notes">
            <span className="text-white hover:bg-blue-800 px-3 py-2 rounded transition cursor-pointer">Notes</span>
          </Link>
          <Link href="/archived-notes">
            <span className="text-white hover:bg-blue-800 px-3 py-2 rounded transition cursor-pointer">Archived Notes</span>
          </Link>
          <Link href="/categories">
            <span className="text-white hover:bg-blue-800 px-3 py-2 rounded transition cursor-pointer">Categories</span>
          </Link>
          <button className="text-white hover:bg-blue-800 px-3 py-2 rounded transition cursor-pointer" onClick={logoutAction}>Logout</button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden mt-4 flex flex-col items-start space-y-2 px-4">
          <Link href="/notes">
            <span className="text-white hover:bg-blue-800 px-3 py-2 rounded transition cursor-pointer">Notes</span>
          </Link>
          <Link href="/archived-notes">
            <span className="text-white hover:bg-blue-800 px-3 py-2 rounded transition cursor-pointer">Archived Notes</span>
          </Link>
          <Link href="/categories">
            <span className="text-white hover:bg-blue-800 px-3 py-2 rounded transition cursor-pointer">Categories</span>
          </Link>
          <span className="text-white hover:bg-blue-800 px-3 py-1 rounded transition cursor-pointer" onClick={logoutAction}>Logout</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
