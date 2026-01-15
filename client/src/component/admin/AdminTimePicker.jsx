import React, { useState } from 'react';
import { getStartTime, getEndTime, getTimeModal } from '../../service/adminSearchApi';
import { useDispatch } from 'react-redux';

export default function AdminTimePicker({ type}) {
  const dispatch = useDispatch();
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [second, setSecond] = useState('00');

  const handleConfirm = () => {
    const timeStr = `${hour}:${minute}:${second}`;
    
    if (type === 'start') {
      dispatch(getStartTime(timeStr));
    } else {
      dispatch(getEndTime(timeStr)); 
    }
    dispatch(getTimeModal(false)); 
  };

  const renderOptions = (range) => {
    return Array.from({ length: range }, (_, i) => {
      const value = i.toString().padStart(2, '0');
      return <option key={value} value={value}>{value}</option>;
    });
  };

  return (
    <div className="admin-time-modal">
      <div className="time-modal-header">
        <h3>{type === 'start' ? '출발 시간 선택' : '도착 시간 선택'}</h3>
      </div>
      <div className="time-select-body">
        <select value={hour} onChange={(e) => setHour(e.target.value)}>
          {renderOptions(24)}
        </select>
        :
        <select value={minute} onChange={(e) => setMinute(e.target.value)}>
          {renderOptions(60)}
        </select>
        :
        <select value={second} onChange={(e) => setSecond(e.target.value)}>
          {renderOptions(60)}
        </select>
      </div>
      <div className="time-select-actions">
        <button onClick={handleConfirm}>확인</button>
      </div>
    </div>
  );
}
