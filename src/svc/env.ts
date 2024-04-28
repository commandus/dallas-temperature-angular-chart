import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Settings } from '../model/settings';
import { OverlayContainer } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root'
})
export class EnvService{
    public settings = new Settings(localStorage.getItem('settings'));

    private renderer: Renderer2;

    constructor(
        private platform: Platform,
        private overlayContainer: OverlayContainer,
        private rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }
  
    public darkThemeOn(on: boolean) : void {
        this.settings.darkMode = on;
        this.settings.save();
        this.renderPageBodyColor();
        this.applyThemeToOverlayContainers();
    }

    private renderPageBodyColor() {
        this.renderer.removeClass(document.body, 'dark');
        this.renderer.removeClass(document.body, 'light');
        this.renderer.addClass(document.body, this.settings.darkMode ? 'dark' : 'light');
    }

    private applyThemeToOverlayContainers() {
        const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
        const classesToRemove = Array.from(overlayContainerClasses).filter(item => item.includes('app-theme-'));
        overlayContainerClasses.remove(...classesToRemove); 
        this.overlayContainer.getContainerElement().classList.add(this.settings.darkMode ? 'dark' : 'light');
    }
}
