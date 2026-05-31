import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    // Scroll to guide if query param exists
    const params = new URLSearchParams(location.search);
    if (params.get('scroll') === 'guide') {
      setTimeout(() => {
        document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.search]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const goToGuide = () => {
    if (isHome) {
      document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/?scroll=guide');
    }
  };

  const links = [
    { label: '免费指南', action: goToGuide },
    { label: '账号商店', to: '/accounts' },
    { label: '出海专网', to: '/network' },
    { label: '增长服务', to: '/growth' },
    { label: '联系我们', href: '#contact' },
  ];

  const transparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
            <Zap size={18} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-bold text-base tracking-tight transition-colors ${transparent ? 'text-white' : 'text-gray-900'}`}>
              出海加速器
            </span>
            <span className={`text-xs font-medium tracking-widest transition-colors ${transparent ? 'text-white/60' : 'text-blue-500'}`}>
              GoGlobal
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) =>
            'to' in l ? (
              <Link
                key={l.to!}
                to={l.to!}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  location.pathname === l.to
                    ? 'text-blue-600'
                    : transparent
                    ? 'text-white/90'
                    : 'text-gray-600'
                }`}
              >
                {l.label}
              </Link>
            ) : 'action' in l ? (
              <button
                key={l.label}
                onClick={l.action}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  transparent ? 'text-white/90' : 'text-gray-600'
                }`}
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.href!}
                href={l.href!}
                onClick={(e) => {
                  if (!isHome) {
                    e.preventDefault();
                    navigate('/?scroll=contact');
                  }
                }}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  transparent ? 'text-white/90' : 'text-gray-600'
                }`}
              >
                {l.label}
              </a>
            )
          )}
          <button
            onClick={goToGuide}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm"
          >
            免费领取指南
          </button>
        </div>

        <button
          className={`md:hidden transition-colors ${transparent ? 'text-white' : 'text-gray-700'}`}
          onClick={() => setOpen(!open)}
          aria-label="toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {links.map((l) =>
            'to' in l ? (
              <Link
                key={l.to!}
                to={l.to!}
                className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <button
                key={l.label}
                onClick={() => {
                  setOpen(false);
                  l.action ? l.action() : document.getElementById(l.href!.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-left text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors"
              >
                {l.label}
              </button>
            )
          )}
          <button
            onClick={() => { setOpen(false); goToGuide(); }}
            className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center hover:bg-blue-700 transition-colors"
          >
            免费领取指南
          </button>
        </div>
      )}
    </nav>
  );
}
