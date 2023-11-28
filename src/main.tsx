import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './reset.css'
import './index.css'
import './responsive.css'
import { MyProvider } from './Context.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MyProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MyProvider>
)
