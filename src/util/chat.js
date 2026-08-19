import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export const ACTIVE_MEMORIAL_ID =
  'd354c71c-3354-49f3-844d-2397bb4168ce';

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return user;
  }

  const { data, error } = await supabase.auth.signInAnonymously();

  if (error || !data.user) {
    console.error('Anonymous sign-in error:', error);
    throw new Error('익명 세션을 확보하지 못했습니다.');
  }

  return data.user;
}

export async function getOrCreateChatRoom(
  memorialId = ACTIVE_MEMORIAL_ID,
) {
  const user = await getCurrentUser();

  const { data: existingRoom, error: selectError } = await supabase
    .from('chat_rooms')
    .select('id, memorial_id, user_id, title, created_at, updated_at')
    .eq('memorial_id', memorialId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (selectError) {
    console.error('Chat room load error:', selectError);
    throw new Error('채팅방을 불러오지 못했습니다.');
  }

  if (existingRoom) {
    return existingRoom;
  }

  console.log('Creating chat room:', {
    userId: user.id,
    memorialId,
  });

  const { data: newRoom, error: insertError } = await supabase
    .from('chat_rooms')
    .insert({
      memorial_id: memorialId,
      user_id: user.id,
      title: '아무개',
    })
    .select('id, memorial_id, user_id, title, created_at, updated_at')
    .single();

  if (insertError) {
    console.error('Chat room create error:', insertError);
    console.error('Chat room create error details:', {
      message: insertError.message,
      code: insertError.code,
      details: insertError.details,
      hint: insertError.hint,
    });
    throw new Error('채팅방을 만들지 못했습니다.');
  }

  return newRoom;
}

export async function loadChatMessages(chatRoomId) {
  if (!chatRoomId) {
    throw new Error('chatRoomId가 필요합니다.');
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .select('id, chat_room_id, role, content, created_at')
    .eq('chat_room_id', chatRoomId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Chat messages load error:', error);
    throw new Error('기존 대화를 불러오지 못했습니다.');
  }

  return (data || []).map((item) => ({
    id: item.id,
    role: item.role,
    content: item.content,
    timestamp: item.created_at,
  }));
}

export async function saveChatMessage(chatRoomId, role, content) {
  if (!chatRoomId) {
    throw new Error('chatRoomId가 필요합니다.');
  }

  if (role !== 'user' && role !== 'assistant') {
    throw new Error('올바르지 않은 메시지 role입니다.');
  }

  const trimmedContent = String(content ?? '').trim();

  if (!trimmedContent) {
    throw new Error('메시지 내용이 필요합니다.');
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      chat_room_id: chatRoomId,
      role,
      content: trimmedContent,
    })
    .select('id, chat_room_id, role, content, created_at')
    .single();

  if (error) {
    console.error('Chat message save error:', error);
    throw new Error('메시지를 저장하지 못했습니다.');
  }

  return {
    id: data.id,
    role: data.role,
    content: data.content,
    timestamp: data.created_at,
  };
}

export async function loadArchives(memorialId) {
  const { data, error } = await supabase
    .from('archives')
    .select('id, memorial_id, title, description, created_at, updated_at')
    .eq('memorial_id', memorialId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Archives load error:', error);
    throw new Error('추억 보관함을 불러오지 못했습니다.');
  }

  return data || [];
}

export async function loadMemories(memorialId) {
  const archives = await loadArchives(memorialId);

  if (archives.length === 0) {
    return [];
  }

  const archiveIds = archives.map((archive) => archive.id);

  const { data, error } = await supabase
    .from('memories')
    .select(
      'id, archive_id, type, title, content, file_path, file_name, mime_type, created_by, created_at, updated_at',
    )
    .in('archive_id', archiveIds)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Memories load error:', error);
    throw new Error('추억 데이터를 불러오지 못했습니다.');
  }

  return data || [];
}

export async function sendChatMessage(message, chatRoomId) {
  if (typeof message !== 'string' || message.trim().length === 0) {
    throw new Error('message가 필요합니다.');
  }

  if (!chatRoomId) {
    throw new Error('chatRoomId가 필요합니다.');
  }

  const { data, error } = await supabase.functions.invoke('chat', {
    body: {
      message: message.trim(),
      chatRoomId,
    },
  });

  if (error) {
    console.error('Chat API error:', error);
    throw new Error('AI 응답을 가져오지 못했습니다.');
  }

  if (!data?.message) {
    throw new Error('AI 응답이 비어 있습니다.');
  }

  return data.message;
}
