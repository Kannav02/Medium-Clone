import { useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';

interface AppBarProps {
  isVisible: boolean;
}

export const AppBar = ({ isVisible }: AppBarProps) => {
  const navigate = useNavigate();
  return (
    <div className="mb-2">
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link to="/blogs">
          <span className="self-center text-2xl font-semibold hover:opacity-50 transition-opacity duration-300">Medium</span>
          </Link>
          <div className="w-auto" id="navbar-default">
            <ul className="font-medium flex space-x-8">
              <li className={`w-32 h-10 ${isVisible ? "":"flex justify-end"}`}>
                <button
                  className={`${
                    isVisible ? 'visible' : 'hidden'
                  } relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800`}
                  onClick={() => {
                    navigate('/createBlog');
                  }}
                >
                  <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                    New
                  </span>
                </button>
                <Avatar authorName="Kannav" type="medium" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="h-0.5 bg-slate-200 w-full"></div>
    </div>
  );
};
