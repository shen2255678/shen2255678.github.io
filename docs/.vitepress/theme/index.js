import DefaultTheme from 'vitepress/theme';
import "./tailwind.css";

// DefaultTheme is an object with some properties
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // Register global components if needed
    // app.component('MyGlobalComponent', MyGlobalComponent)
    
    // We're not registering components globally because they're imported directly in the .md files
  }
}
