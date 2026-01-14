-- Add DELETE policy for user_progress table
CREATE POLICY "Users can delete their own progress"
  ON public.user_progress FOR DELETE
  USING (auth.uid() = user_id);

-- Add DELETE policy for streak_history table
CREATE POLICY "Users can delete their own streak history"
  ON public.streak_history FOR DELETE
  USING (auth.uid() = user_id);