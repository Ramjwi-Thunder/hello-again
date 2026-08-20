create or replace function public.get_chat_memories(p_chat_room_id uuid)
returns table (
  type text,
  title text,
  content text,
  file_name text,
  file_path text,
  mime_type text,
  created_at timestamptz
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_memorial_id uuid;
begin
  select cr.memorial_id
    into v_memorial_id
  from public.chat_rooms as cr
  where cr.id = p_chat_room_id
    and cr.user_id = auth.uid();

  if not found then
    raise exception '채팅방에 접근할 수 없습니다.'
      using errcode = '42501';
  end if;

  return query
    select
      m.type,
      m.title,
      m.content,
      m.file_name,
      m.file_path,
      m.mime_type,
      m.created_at
    from public.archives as a
    inner join public.memories as m
      on m.archive_id = a.id
    where a.memorial_id = v_memorial_id
    order by m.created_at asc;
end;
$$;

revoke all on function public.get_chat_memories(uuid) from public;
grant execute on function public.get_chat_memories(uuid) to anon;
grant execute on function public.get_chat_memories(uuid) to authenticated;
