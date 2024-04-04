import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Assuming AppModule is your root module
import { Compiler } from '@angular/core';

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    const compiler = moduleRef.injector.get(Compiler);
    compiler.compileModuleAndAllComponentsSync(AppModule);
  })
  .catch(err => console.error(err));
  
  // Function to clear localStorage
function clearLocalStorageOnClose() {
  localStorage.clear(); // Clear all items in localStorage
}

// Attach event listener to onbeforeunload event
window.onbeforeunload = function() {
  clearLocalStorageOnClose(); // Call the function to clear localStorage
};