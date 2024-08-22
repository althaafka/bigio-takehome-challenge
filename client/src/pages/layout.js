import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white text-black flex flex-col shadow-md">
        <div className="flex items-center justify-center px-4 py-6">
          <svg
            className="svg-icon mr-2"
            style={{
              width: '1.5em',
              height: '1.5em',
              fill: '#1A95AA',
              overflow: 'hidden',
            }}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M248 160v644c0 15.4-12.6 28-28 28s-28-12.6-28-28V224H160c-35.4 0-64 28.6-64 64v576c0 35.4 28.6 64 64 64h706.2c34 0 61.8-27.6 61.8-61.8V160c0-35.4-28.6-64-64-64l-556 4c-35.4 0-60 24.6-60 60z m132 64h168c15.4 0 28 12.6 28 28s-12.6 28-28 28h-168c-15.4 0-28-12.6-28-28s12.6-28 28-28z m0 320h296c15.4 0 28 12.6 28 28s-12.6 28-28 28H380c-15.4 0-28-12.6-28-28s12.6-28 28-28z m392 216H380c-15.4 0-28-12.6-28-28s12.6-28 28-28h392c15.4 0 28 12.6 28 28s-12.6 28-28 28z m0-320H380c-15.4 0-28-12.6-28-28s12.6-28 28-28h392c15.4 0 28 12.6 28 28s-12.6 28-28 28z" />
          </svg>
          <div className="text-2xl font-bold text-blue2">
            STORYKU
          </div>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`py-4 px-6 flex items-center hover:bg-blue1 hover:text-white ${
                  isActive('/') && !isActive('/story') ? 'bg-blue1 text-white' : ''
                }`}
              >
                <svg
                  className="mr-4"
                  style={{ width: '1em', height: '1em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128 554.666667h341.333333V128H128v426.666667z m0 341.333333h341.333333V640H128v256z m426.666667 0h341.333333V469.333333H554.666667v426.666667z m0-768v256h341.333333V128H554.666667z" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/story"
                className={`py-4 px-6 flex items-center hover:bg-blue1 hover:text-white ${
                  isActive('/story') ? 'bg-blue1 text-white' : ''
                }`}
              >
                <svg
                  className="mr-4"
                  style={{ width: '1em', height: '1em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M585.840286 48.820024h-146.460071a48.820024 48.820024 0 0 0-48.820024 48.820024v829.940405a48.820024 48.820024 0 0 0 48.820024 48.820024h146.460071a48.820024 48.820024 0 0 0 48.820024-48.820024V97.640048a48.820024 48.820024 0 0 0-48.820024-48.820024z m7.078904 829.940405h-160.617879v-24.410012h160.617879zM889.012634 219.690107h-148.168772a48.820024 48.820024 0 0 0-48.820024 48.820024v659.070322a48.820024 48.820024 0 0 0 48.820024 48.820024h148.168772a48.820024 48.820024 0 0 0 48.820024-48.820024V268.510131a48.820024 48.820024 0 0 0-48.820024-48.820024z m6.346603 659.070322h-160.861978v-24.410012h160.861978z m-610.250298-707.890346h-148.901072a48.820024 48.820024 0 0 0-48.820024 48.820024v707.890346a48.820024 48.820024 0 0 0 48.820024 48.820024h148.168772a48.820024 48.820024 0 0 0 48.820024-48.820024V219.690107a48.820024 48.820024 0 0 0-48.820024-48.820024z m6.346603 707.890346H129.861263v-24.410012h160.861979z" />
                </svg>
                Story Management
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-grow p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
