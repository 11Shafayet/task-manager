import { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { navData } from '../../data/navData';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    try {
      logout();
      toast.success('Logged out successfully');
      navigate('/sign-in');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <>
      {/* desktop navigation */}
      <div className="fixed hidden h-screen w-[270px] border-b border-r lg:block">
        <div className="flex flex-col items-center justify-center border-b p-8">
          <div>
            <Link to="/">
              <h1 className="random_text_color mb-1 text-lg uppercase italic leading-6">
                Medical Management
              </h1>
            </Link>
          </div>
        </div>

        <div className="hidden flex-col items-center justify-center md:flex">
          <div className="flex w-full flex-col">
            {navData.map((item, i) => {
              return (
                <Link
                  to={`${item.link}`}
                  key={i}
                  className={`sidebar-button ${
                    pathname === item.link && 'bg-white bg-opacity-10'
                  }`}
                >
                  <p>{item.title}</p>
                </Link>
              );
            })}

            <button className="sidebar-button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* mobile navigation */}
      <div className="relative block w-full border-b py-6 lg:hidden">
        <div className="container">
          <div className="flex items-center justify-between">
            <Link to="/">
              <h1 className="mb-1 text-xl leading-6">Shafayetur Rahman</h1>
            </Link>
            {/* hamburger */}
            <div
              className="relative flex h-12 w-12 cursor-pointer items-center justify-center"
              onClick={() => setOpen((prev) => !prev)}
            >
              {!open ? (
                <div>
                  <span className="relative block h-0.5 w-8 -translate-y-1.5 rounded bg-white"></span>
                  <span className="relative block h-0.5 w-8 rounded bg-white"></span>
                  <span className="relative block h-0.5 w-8 translate-y-1.5 rounded bg-white"></span>
                </div>
              ) : (
                <div>
                  <span className="relative block h-0.5 w-8 rotate-45 rounded bg-white"></span>
                  <span className="relative block h-0.5 w-8 -rotate-45 rounded bg-white"></span>
                </div>
              )}
            </div>
            <div
              className={`absolute left-0 w-full text-center bg-[#121212] ${
                open ? 'top-[97px]' : '-top-[500px]'
              } z-50 duration-300`}
            >
              <div className="flex w-full flex-col">
                {navData.map((item, i) => {
                  return (
                    <Link
                      to={`${item.link}`}
                      key={i}
                      className={`sidebar-button ${
                        pathname === item.link && 'bg-white bg-opacity-20'
                      }`}
                    >
                      <p>{item.title}</p>
                    </Link>
                  );
                })}
              </div>

              <button className="sidebar-button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
