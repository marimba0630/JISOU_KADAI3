import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LearningRecord } from './LearningRecord.jsx'
import { initAnalytics } from './lib/firebase.js'

initAnalytics();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LearningRecord />
  </StrictMode>,
)