import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {

  // Inyectamos el DomSanitizer
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    // Le decimos a Angular que confíe en este valor como HTML
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}