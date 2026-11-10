import { TestBed } from '@angular/core/testing';
import { REQUEST } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    })
      .compileComponents();
  });

  async function renderAt(path: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await TestBed.inject(Router).navigateByUrl(path);
    fixture.detectChanges();
    await fixture.whenStable();
    return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('app-home-page')!;
  }

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Badal landing page on the English route', async () => {
    const compiled = await renderAt('/en');
    expect(compiled.querySelector('h1')?.textContent).toContain('Good things deserve');
    expect(compiled.querySelector('img[src="/app-icon.png"]')).toBeTruthy();
    expect(compiled.querySelector<HTMLButtonElement>('.play-store-button')?.disabled).toBe(true);
    expect(compiled.querySelector('.play-store-name')?.textContent).toContain('Google Play');
    expect(compiled.querySelector<HTMLAnchorElement>('.footer-contact[href^="mailto:"]')?.href).toBe(
      'mailto:badal@tulips-techs.com',
    );
    expect(compiled.querySelector<HTMLAnchorElement>('.footer-contact[href^="tel:"]')?.href).toBe(
      'tel:+962791151234',
    );
    expect(compiled.querySelector('.contact-value[dir="ltr"]')?.textContent).toBe(
      'badal@tulips-techs.com',
    );
    expect(compiled.querySelector('.copyright-banner')?.textContent).toContain(
      `© ${new Date().getFullYear()} Badal. All rights reserved.`,
    );
    expect(compiled.querySelector<HTMLAnchorElement>('.language-toggle')?.getAttribute('href')).toBe('/ar');
    expect(compiled.querySelector<HTMLAnchorElement>('.privacy-button')?.getAttribute('href')).toBe(
      '/privacy-policy.html',
    );
  });

  it('should render Arabic based on the locale URL', async () => {
    TestBed.overrideProvider(REQUEST, {
      useValue: new Request('http://localhost/ar', {
        headers: { Cookie: 'badal_locale=en', 'Accept-Language': 'en-US' },
      }),
    });
    const host = await renderAt('/ar');

    expect(host.getAttribute('lang')).toBe('ar');
    expect(host.getAttribute('dir')).toBe('rtl');
    expect(host.querySelector('p.hero-description')?.textContent).toContain(
      'بادل أغراضك مع الآخرين، واكتشف ما تحتاجه',
    );
    expect(host.querySelector('.play-store-status')?.textContent).toContain('قريباً');
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
    expect(host.querySelector<HTMLAnchorElement>('.language-toggle')?.getAttribute('href')).toBe('/en');
    expect(host.querySelector('.footer-brand')?.textContent?.trim()).toBe('Badal.');
    expect(host.querySelector('.footer-brand')?.getAttribute('aria-label')).toBe('Badal home');
    expect(host.querySelector('.footer-actions')?.getAttribute('aria-label')).toBe('Contact information');
    expect(host.querySelector('.privacy-button')?.textContent?.trim()).toBe('Privacy Policy');
    expect(host.querySelector('.back-to-top')?.textContent?.trim()).toBe('Back to top ↑');
    const footerBanner = host.querySelector<HTMLElement>('.copyright-banner');
    expect(footerBanner?.getAttribute('lang')).toBe('en');
    expect(footerBanner?.getAttribute('dir')).toBe('ltr');
    expect(footerBanner?.querySelectorAll('p')[0].textContent?.trim()).toBe(
      `© ${new Date().getFullYear()} Badal. All rights reserved.`,
    );
    expect(footerBanner?.querySelectorAll('p')[1].textContent?.trim()).toBe(
      'Powered by Tulips Technologies',
    );
  });

  it('should use the saved locale before Accept-Language on the root URL', async () => {
    TestBed.overrideProvider(REQUEST, {
      useValue: new Request('http://localhost/', {
        headers: { Cookie: 'badal_locale=ar', 'Accept-Language': 'en-US' },
      }),
    });
    const host = await renderAt('/');

    expect(host.getAttribute('lang')).toBe('ar');
  });

  it('should use the preferred supported Accept-Language on the root URL', async () => {
    TestBed.overrideProvider(REQUEST, {
      useValue: new Request('http://localhost/', {
        headers: { 'Accept-Language': 'en-US;q=0.5, ar;q=0.9' },
      }),
    });
    const host = await renderAt('/');

    expect(host.getAttribute('lang')).toBe('ar');
  });
});
