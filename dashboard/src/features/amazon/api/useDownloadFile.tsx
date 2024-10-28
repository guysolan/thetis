import React from 'react'
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';

const downloadFile = async (pathName: string) => {
    const { data, error } = await supabase.storage.from('amazon-reports').download(pathName);
    if (error) throw error;
    return data;
}
const useDownloadFile = () => {
  return useMutation({
    mutationFn: (pathName: string) => downloadFile(pathName),
  })
}

export default useDownloadFile