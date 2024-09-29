import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  safeUrl: SafeUrl = '';
  slug = '';
  myTools = [
    {
      name: 'Todo App',
      url: 'https://todo.apwebwiz.com/app',
    },
    {
      name: 'Generate',
      url: 'https://gen.apwebwiz.com/',
    },
    {
      name: 'Tech nepal',
      url: 'https://tech.apwebwiz.com/',
    },
    {
      name: 'Search',
      url: 'https://search.apwebwiz.com/home',
    },
    {
      name: 'Job Lister',
      url: 'https://ananta-job-lister.firebaseapp.com/',
    },
  ];

  constructor(private sanitizer: DomSanitizer, private router: Router) {
    const urlParams = new URLSearchParams(window.location.search);
    const tool = urlParams.get('tool');
    if (tool) {
      const selectedTool = this.myTools.find(
        (t) => this.toSlug(t.name) === tool
      );
      if (selectedTool) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          selectedTool.url
        );
        this.slug = tool;
      }
    }
  }

  openTool(tool: any) {
    this.slug = this.toSlug(tool.name);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(tool.url);
    this.router.navigateByUrl(`/?tool=${this.slug}`);
  }

  gotoHome() {
    this.router.navigateByUrl(`/`);
    this.slug = '';
    this.safeUrl = '';
  }

  toSlug(name: string) {
    return name.toLowerCase().replace(/\s/g, '-');
  }
}
