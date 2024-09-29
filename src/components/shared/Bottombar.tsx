import { bottombarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Link, NavLink, useLocation } from 'react-router-dom';


const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
          const isActive: boolean = pathname === link.route; // whether this link is the one we're currently on
          return (
              <Link
                to={link.route}
                key={link.label} 
                className={`group ${isActive && "bg-primary-500 "} flex-center flex-col gap-1 p-2 transition hover:bg-primary-500 rounded-[10px]`}
              >
                <img 
                  src={link.imgURL}
                  alt={link.label}
                  className={`group-hover:invert-white ${isActive && "invert-white"}`}
                  width={16}
                  height={16}
                />
                <p className="tiny-medium text-light-2">{link.label}</p>
                
              </Link>
            
          )
      })}
    </section>
  )
}

export default Bottombar