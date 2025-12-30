import Link from 'next/link';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portraits', href: '/portraits' },
    { label: 'Interviews', href: '/interviews' },
    { label: 'Documentary Films', href: '/documentary' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Lifestyle', href: '/lifestyle' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Portfolio
        </Link>
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
