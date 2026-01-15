import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from "antd";
import { IoArrowBackSharp } from "react-icons/io5";
import { RiHomeLine } from "react-icons/ri";
import axios from 'axios';

export default function SignupTerms({onNext}) {
    const navigate = useNavigate();
    const [ terms, setTerms ] = useState([]); 
    const [ modalContent, setModalContent ] = useState(''); 
    const [ modalOpen, setModalOpen ] = useState(false); 
    const [ checkedStates, setCheckedStates ] = useState([]); 
    const [ allChecked, setAllChecked ] = useState(false); 

    useEffect(()=>{
      axios.get('/data/signupTerms.json')
            .then((res)=>{
              setTerms(res.data.terms);
              setCheckedStates(new Array(res.data.terms.length).fill(false));
            })
            .catch((error)=>console.log(error));
    },[]);

    useEffect(()=>{
      if(terms.length > 0 && checkedStates.length === terms.length){
        setAllChecked(checkedStates.every(Boolean));
      }
    },[checkedStates, terms.length]);
    
    /* 모달페이지 띄우기 */    
    const openModal = (content) =>{
      setModalContent(content);
      setModalOpen(true);
    };

    const handleNext = () =>{
      const reqIndex = terms.map((term, idx)=> term.type ==="필수"? idx : null)
                            .filter(idx => idx != null);
      const allReqChecked = reqIndex.every(idx => checkedStates[idx]);

      if(!allReqChecked){
        alert('필수 항목을 모두 동의해주세요.');
        return;
      }
      onNext(true); 
    };

    /* 전체 동의 */    
    const handleAllAgree  = (e) =>{
      const checked = e.target.checked;
      setAllChecked(checked);
      setCheckedStates(new Array(terms.length).fill(checked));
    };

    /* 개별 동의 */  
    const handleSingleCheck = (idx) =>(e)=> {
      const updated = [...checkedStates];
      updated[idx] = e.target.checked;
      setCheckedStates(updated);
    };

  return (
    <div className='signup-content'>
      <div className='signup-header'>
        <div>
          <IoArrowBackSharp className='header-icon' onClick={()=>navigate('/login')}/> 
          <span>약관동의</span>
        </div>
         <RiHomeLine className='header-icon2' onClick={()=>navigate('/')}/>
      </div> 
      <div className='areement'>
        <p>약관 내용에 먼저</p>
        <p>동의해주세요.</p>
      </div> 
      <ul className='agreement-list'>
                <li>
                  <input type="checkbox" className='all-agree' id='check-ch' checked={allChecked} onChange={handleAllAgree}/> 
                  <label htmlFor="check-ch">
                    <span>전체동의</span>
                  </label>
                </li>
                { terms && terms.map((term, i)=>{
                   const id = `check-ch2-${i}`; 
                   return (
                    <li key={i}>
                      <input type="checkbox" id={id} 
                             checked={checkedStates[i] || false}
                             onChange={handleSingleCheck(i)}/> 
                      <label htmlFor={id}>
                        <span className='check-label'>
                          [{term.type}]&nbsp; 
                          <span className='term-info' 
                                onClick={()=> term.content && openModal(term.content)}>{term.title}</span>에 대한 동의
                        </span>
                      </label>
                    </li>
                  )})}
        </ul>
        <Modal className='signup-terms' title="약관내용" open={modalOpen}
        onCancel={()=>setModalOpen(false)}footer={null}>
        <p>{modalContent}</p>
        </Modal>
        <button type='button' className='agree-btn' onClick={handleNext}>다음</button>
    </div>
  );
}

