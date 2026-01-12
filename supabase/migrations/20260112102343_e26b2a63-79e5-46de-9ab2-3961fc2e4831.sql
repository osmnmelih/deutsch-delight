-- Create table for user SRS data (synced vocabulary progress)
CREATE TABLE public.user_srs_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_id TEXT NOT NULL,
  ease_factor NUMERIC(4,2) NOT NULL DEFAULT 2.5,
  interval INTEGER NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  next_review TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  correct_count INTEGER NOT NULL DEFAULT 0,
  incorrect_count INTEGER NOT NULL DEFAULT 0,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, word_id)
);

-- Enable RLS
ALTER TABLE public.user_srs_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own SRS data"
  ON public.user_srs_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own SRS data"
  ON public.user_srs_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own SRS data"
  ON public.user_srs_data FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own SRS data"
  ON public.user_srs_data FOR DELETE
  USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_user_srs_data_updated_at
  BEFORE UPDATE ON public.user_srs_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_user_srs_data_user_id ON public.user_srs_data(user_id);
CREATE INDEX idx_user_srs_data_next_review ON public.user_srs_data(user_id, next_review);