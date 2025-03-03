import DefaultTheme from 'vitepress/theme';
import "./tailwind.css";
import NotFound from './NotFound.vue';

// DefaultTheme is an object with some properties
export default {
  ...DefaultTheme,
  // Override the NotFound component
  NotFound,
  enhanceApp({ app }) {
    // Register global components if needed
    // app.component('MyGlobalComponent', MyGlobalComponent)
    
    // We're not registering components globally because they're imported directly in the .md files
  }
}
