ALTER TABLE public.users
ADD COLUMN username TEXT UNIQUE;

UPDATE public.users
SET username = 'hammaadworks'
WHERE email = 'hammaadworks@gmail.com';

ALTER TABLE public.users
ALTER COLUMN username SET NOT NULL;
