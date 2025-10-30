import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="navbar-container">
        <!-- Logo -->
        <a routerLink="/" class="navbar-logo">
          <img 
            src="logo.webp" 
            alt="Semillas & Talentos Logo"
            class="logo-image">
        </a>

        <!-- Desktop Navigation -->
        <div class="navbar-menu">
          @for (link of navLinks; track link.path) {
            <a 
              [routerLink]="link.path" 
              routerLinkActive="active"
              class="nav-link">
              {{ link.label }}
            </a>
          }
        </div>

        <!-- CTA Button & Mobile Toggle -->
        <div class="navbar-actions">
          <a routerLink="/donar" class="btn-donate">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Donar</span>
          </a>

          <!-- Mobile Menu Toggle -->
          <button 
            class="mobile-toggle"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="isMobileMenuOpen()"
            aria-label="Toggle navigation menu">
            @if (!isMobileMenuOpen()) {
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Sidebar -->
      @if (isMobileMenuOpen()) {
        <div class="mobile-overlay" (click)="closeMobileMenu()"></div>
      }
      
      <div class="mobile-sidebar" [class.open]="isMobileMenuOpen()">
        <div class="mobile-sidebar-header">
          <img 
            src="logo.webp" 
            alt="Semillas & Talentos Logo"
            class="sidebar-logo">
          <h2 class="sidebar-title"></h2>
        </div>

        <div class="mobile-sidebar-content">
          @for (link of navLinks; track link.path) {
            <a 
              [routerLink]="link.path" 
              routerLinkActive="active"
              class="mobile-nav-link"
              (click)="closeMobileMenu()">
              <span class="mobile-link-icon">
                @if (link.icon) {
                  <span [innerHTML]="link.icon"></span>
                }
              </span>
              {{ link.label }}
            </a>
          }

          <div class="mobile-divider"></div>

          <a 
            routerLink="/donar" 
            class="mobile-donate-btn"
            (click)="closeMobileMenu()">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Hacer una Donación
          </a>
        </div>

        <div class="mobile-sidebar-footer">
          <p class="footer-text">Transformando vidas a través de la educación</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    /* Variables */
    :host {
      --navbar-height: 80px;
      --navbar-bg: rgba(255, 255, 255, 0.98);
      --navbar-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      --primary-color: #667eea;
      --primary-hover: #5568d3;
      --text-color: #2d3748;
      --text-muted: #718096;
      --border-color: #e2e8f0;
      --sidebar-width: 320px;
    }

    /* Navbar Container */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--navbar-height);
      background: var(--navbar-bg);
      backdrop-filter: blur(10px);
      box-shadow: var(--navbar-shadow);
      z-index: 1000;
      transition: all 0.3s ease;
    }

    .navbar.scrolled {
      height: 70px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
    }

    .navbar-container {
      max-width: 1400px;
      height: 100%;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    /* Logo */
    .navbar-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: var(--text-color);
      font-weight: 700;
      font-size: 1.25rem;
      transition: opacity 0.3s ease;
      flex-shrink: 0;
    }

    .navbar-logo:hover {
      opacity: 0.8;
    }

    .logo-image {
      height: 60px;
      width: auto;
      object-fit: contain;
    }

    .logo-text {
      font-size: 1.8rem;
      background: linear-gradient(135deg, #667eea 0%, #4ba272ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Desktop Menu */
    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex: 1;
      justify-content: center;
    }

    .nav-link {
      position: relative;
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      font-size: 1.3rem;
      padding: 0.5rem 0;
      transition: color 0.3s ease;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--primary-color);
    }

    .nav-link:hover::after,
    .nav-link.active::after {
      width: 100%;
    }

    /* Actions */
    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn-donate {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #1bb335ff 100%);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .btn-donate:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .btn-donate svg {
      animation: heartbeat 1.5s ease-in-out infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      10%, 30% { transform: scale(1.1); }
      20% { transform: scale(0.95); }
    }

    /* Mobile Toggle */
    .mobile-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--text-color);
      transition: all 0.3s ease;
    }

    .mobile-toggle:hover {
      color: var(--primary-color);
      transform: scale(1.1);
    }

    /* Mobile Overlay */
    .mobile-overlay {
      display: none;
      position: fixed;
      top: var(--navbar-height);
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Mobile Sidebar */
    .mobile-sidebar {
      position: fixed;
      top: var(--navbar-height);
      right: -100%;
      width: var(--sidebar-width);
      max-width: 90vw;
      height: calc(100vh - var(--navbar-height));
      background: white;
      box-shadow: -4px 0 30px rgba(0, 0, 0, 0.15);
      transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      z-index: 1000;
      overflow-y: auto;
    }

    .mobile-sidebar.open {
      right: 0;
    }

    .mobile-sidebar-header {
      padding: 2rem;
      border-bottom: 1px solid var(--border-color);
      text-align: center;
    }

    .sidebar-logo {
      height: 60px;
      width: auto;
      margin-bottom: 1rem;
    }

    .sidebar-title {
      font-size: 1.25rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0;
    }

    .mobile-sidebar-content {
      flex: 1;
      padding: 1rem 0;
    }

    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 2rem;
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      font-size: 1.05rem;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .mobile-nav-link:hover,
    .mobile-nav-link.active {
      background: rgba(102, 126, 234, 0.05);
      color: var(--primary-color);
      border-left-color: var(--primary-color);
    }

    .mobile-link-icon {
      font-size: 1.25rem;
      display: flex;
      align-items: center;
    }

    .mobile-divider {
      height: 1px;
      background: var(--border-color);
      margin: 1rem 2rem;
    }

    .mobile-donate-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin: 1rem 2rem;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;
    }

    .mobile-donate-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .mobile-sidebar-footer {
      padding: 2rem;
      border-top: 1px solid var(--border-color);
      background: rgba(102, 126, 234, 0.03);
    }

    .footer-text {
      color: var(--text-muted);
      font-size: 0.875rem;
      margin: 0 0 1rem 0;
      text-align: center;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(102, 126, 234, 0.1);
      color: var(--primary-color);
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: var(--primary-color);
      color: white;
      transform: translateY(-2px);
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .navbar-menu {
        gap: 1.5rem;
      }

      .nav-link {
        font-size: 0.95rem;
      }
    }

    @media (max-width: 768px) {
      .navbar-container {
        padding: 0 1rem;
      }

      .navbar-menu {
        display: none;
      }

      .mobile-toggle {
        display: flex;
      }

      .btn-donate span {
        display: none;
      }

      .btn-donate {
        padding: 0.75rem;
        width: 44px;
        height: 44px;
        justify-content: center;
      }

      .mobile-overlay {
        display: block;
      }

      .logo-text {
        display: none;
      }

      .logo-image {
        height: 40px;
      }
    }

    @media (max-width: 480px) {
      .navbar {
        height: 65px;
      }

      .navbar.scrolled {
        height: 60px;
      }

      .mobile-sidebar {
        top: 65px;
        height: calc(100vh - 65px);
      }
    }
  `]
})
export class NavbarComponent {
  // Signals para el estado
  isMobileMenuOpen = signal(false);
  isScrolled = signal(false);

  // Links de navegación
  navLinks: NavLink[] = [
    { label: 'Inicio', path: '/', icon: '' },
    { label: 'Nosotros', path: '/about', icon: '' },
    { label: 'Proyectos', path: '/projects', icon: '' },
    { label: 'Contacto', path: '/contact', icon: '' },
    { label: 'Donaciones', path: '/donations', icon: '' }
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    // Cerrar menú móvil si la ventana se agranda
    if (window.innerWidth > 768 && this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
    this.toggleBodyScroll();
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    this.enableBodyScroll();
  }

  private toggleBodyScroll(): void {
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  private enableBodyScroll(): void {
    document.body.style.overflow = '';
  }
}