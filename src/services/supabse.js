import { createClient } from '@supabase/supabase-js'

const SUPABSE_URL = 'https://vqdzmxkazjeccrqsjzrh.supabase.co'
const SUPABSE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZHpteGthemplY2NycXNqenJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNTM2OTgsImV4cCI6MjA0OTkyOTY5OH0.0eqWbPeQhPCZ6Bo3Fq6o65dV-60EtIjL132IKCg2E6Q'

const supabase = createClient(SUPABSE_URL, SUPABSE_API_KEY)

export default supabase
