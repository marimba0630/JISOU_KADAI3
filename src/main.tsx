import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LearningRecord } from './LearningRecord'
import { initAnalytics } from './lib/firebase'

initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LearningRecord />
  </StrictMode>,
)