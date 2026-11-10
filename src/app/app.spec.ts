import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Badal landing page', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Good things deserve');
    expect(compiled.querySelector('img[src="/app-icon.png"]')).toBeTruthy();
    expect(compiled.querySelector<HTMLButtonElement>('.play-store-button')?.disabled).toBe(true);
    expect(compiled.querySelector('.play-store-name')?.textContent).toContain('Google Play');
    expect(compiled.querySelector<HTMLAnchorElement>('.footer-contact[href^="mailto:"]')?.href).toBe(
      'mailto:kalemah@tulips-techs.com',
    );
    expect(compiled.querySelector<HTMLAnchorElement>('.footer-contact[href^="tel:"]')?.href).toBe(
      'tel:+962791154321',
    );
    expect(compiled.querySelector<HTMLAnchorElement>('.privacy-button')?.getAttribute('href')).toBe(
      '/privacy-policy.html',
    );
  });

  it('should switch between English and Arabic and update text direction', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const app = fixture.componentInstance;
    const host = fixture.nativeElement as HTMLElement;

    app.toggleLanguage();
    fixture.detectChanges();

    expect(host.getAttribute('lang')).toBe('ar');
    expect(host.getAttribute('dir')).toBe('rtl');
    expect(host.querySelector('p.hero-description')?.textContent).toContain(
      'بادل أغراضك مع الآخرين، واكتشف ما تحتاجه',
    );
    expect(host.querySelector('.play-store-status')?.textContent).toContain('قريباً');
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');

    app.toggleLanguage();
    fixture.detectChanges();

    expect(host.getAttribute('lang')).toBe('en');
    expect(host.getAttribute('dir')).toBe('ltr');
  });
});
