import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LearningRecord } from './LearningRecord'
import { initAnalytics } from './lib/firebase'
import { ChakraProvider, defaultConfig, createSystem, defaultSystem } from "@chakra-ui/react"

initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <LearningRecord />
    </ChakraProvider>
  </StrictMode>,
)