import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfileImage } from '../service/profileApi.js';
import { getMyInfo } from '../service/myinfoApi.js'

export default function ImageUpload({ triggerRef }) {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const myinfo = useSelector((state) => state.myinfo.myinfo);

  useEffect(() => {
    if (triggerRef?.current) {
      triggerRef.current.onclick = () => inputRef.current?.click();
    }
  }, [triggerRef]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const oldFile = myinfo.profile_img?.[0]?.split('/').pop();

    const result = await uploadProfileImage({file, oldFile, id: myinfo.id });

    if (result?.filename) {
      dispatch(getMyInfo());
    }
  };

  return (
    <input
      type="file"
      ref={inputRef}
      onChange={handleFileUpload}
      style={{ display: 'none' }} /* 변경버튼 클릭시 - 바로열리게 */
    />
  );
}
