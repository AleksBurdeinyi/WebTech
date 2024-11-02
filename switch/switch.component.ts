import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [], // Add any other modules you need here
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'] // Corrected to styleUrls
})
export class SwitchComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {} // Optional typing

  ngOnInit() {
    // Ensure it runs in the browser before accessing `localStorage` and `window`
    if (isPlatformBrowser(this.platformId)) {
      this.loadSavedTheme();
    }
  }

  setTheme(theme: 'light' | 'dark' | 'auto') {
    if (isPlatformBrowser(this.platformId)) {
      // Save selection in Local Storage if supported
      localStorage.setItem('theme', theme);

      // Apply the theme
      if (theme === 'auto') {
        this.applyAutoTheme();
      } else {
        document.body.setAttribute('data-bs-theme', theme);
      }
    }
  }

  private loadSavedTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto';
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        this.setTheme('auto'); 
      }
    }
  }

  private applyAutoTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      document.body.setAttribute('data-bs-theme', prefersDark.matches ? 'dark' : 'light');

      // Listen for OS preference changes
      prefersDark.addEventListener('change', (e) => {
        document.body.setAttribute('data-bs-theme', e.matches ? 'dark' : 'light');
      });
    }
  }
}
