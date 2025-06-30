
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vxlpctftkpzjiahzvtor.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4bHBjdGZ0a3B6amlhaHp2dG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNzI1MjAsImV4cCI6MjA2Njg0ODUyMH0.okno5hmBvbqrkW0Bq_Gydu9pp5Tx42tlJW0f1oNvzgM'

export const supabase = createClient(supabaseUrl, supabaseKey)
