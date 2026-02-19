insert into storage.buckets (id, name, public)
values ('company-pdfs', 'company-pdfs', true)
on conflict (id) do nothing;

drop policy if exists "Public read company-pdfs" on storage.objects;
drop policy if exists "Public insert company-pdfs" on storage.objects;
drop policy if exists "Public update company-pdfs" on storage.objects;
drop policy if exists "Public delete company-pdfs" on storage.objects;

create policy "Public read company-pdfs"
on storage.objects
for select
using (bucket_id = 'company-pdfs');

create policy "Public insert company-pdfs"
on storage.objects
for insert
with check (bucket_id = 'company-pdfs');

create policy "Public update company-pdfs"
on storage.objects
for update
using (bucket_id = 'company-pdfs')
with check (bucket_id = 'company-pdfs');

create policy "Public delete company-pdfs"
on storage.objects
for delete
using (bucket_id = 'company-pdfs');
