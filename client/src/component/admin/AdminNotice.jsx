import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


export default function AdminNotice() {
  const [ formData, setFormData ] = useState([]);
  const [ selectedRows, setSelectedRows ] = useState([]);
  const [ currentList, setCurrentList ] = useState(formData);
  const [searchType, setSearchType] = useState('default');
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const [ page, setPage ] = useState(1);
  const [ block, setBlock ] = useState(0);
  const itemsPerPage = 10; // 페이지당 개수
  const pageBlockSize = 10;
  const totalPages = Math.ceil(formData.length / itemsPerPage);
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(()=>{
    axios.post('http://localhost:9000admin/noticeList')
         .then((res)=>setFormData(res.data))
         .catch((error)=>console.log(error))
  },[]);

  
  useEffect(() => {
    setCurrentList(formData.slice(indexOfFirstItem, indexOfLastItem));
  }, [page, formData]);
  
  /* 전체 체크박스 선택 및 해제 */
  const handleSelectAll = () => {
    if (selectedRows.length === currentList.length) {
      setSelectedRows([]);
    } else {
      const deleteList = currentList.map(item => item.num);
      setSelectedRows(deleteList);
    }
  };
  
  /* 개별 체크박스 선택 및 해제 */
  const handleSelectRow = (num) => {
    setSelectedRows(prev => prev.includes(num) ? prev.filter(rowId => rowId !== num) 
                            : [...prev, num] );
  }

  /* 페이지네이션 - 번호 */
  const getPageNumbers = () => {
    const start = block * pageBlockSize + 1;
    const end = Math.min(start + pageBlockSize - 1, totalPages);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  /* 페이지네이션 - 이전 버튼 */
  const goToPrevBlock = () =>{
    if(block > 0){
      const newBlock = block -1;
      setBlock(newBlock);
      setPage(newBlock - pageBlockSize +1);
    }
  };

  /* 페이지네이션 - 다음 버튼 */
  const goToNextBlock = () =>{
    if ((block + 1) * pageBlockSize < totalPages) {
      const newBlock = block + 1;
      setBlock(newBlock);
      setPage(newBlock * pageBlockSize + 1);
    }
  };

  /* 검색 이벤트 */
  const handleSearch = async() =>{
    try {
      const result = await axios.post('http://localhost:9000admin/noticeSearch', {keyword:searchKeyword.trim()});
      setFormData(result.data);
      setPage(1);
      setBlock(0);
      return;
    } catch (error) {
      console.log(error);
      alert('검색 중 에러가 발생했습니다.');
    }
  };

  /* 삭제 버튼 이벤트 */
  const handleDelete = async() =>{
    if(selectedRows.length === 0){
      alert('삭제할 항목을 선택하세요.');
      return;
    }
    try {
      const result = await axios.post('http://localhost:9000admin/notice/delete',{nums:selectedRows});
      if(result.data !== 0){
        alert('삭제가 완료되었습니다.');
        const res = await axios.post('http://localhost:9000admin/noticeList');
        setFormData(res.data);       
        setSelectedRows([]);   
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.log(error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='admin-airlist-content'>
      <div className='admin-airlist-top'>
        <div className='admin-airlist-title'>
         공지사항
        </div>
        <div className='admin-airlist-controls'>
          <input type="text"
                 className='admin-search' 
                 value={searchKeyword}
                 onChange={(e) => setSearchKeyword(e.target.value)}
                 placeholder='제목을 입력하세요'
                 onKeyDown={(e) => {if (e.key === 'Enter') handleSearch()}}/>
          <IoMdSearch className='admin-search-icon'  onClick={handleSearch} style={{ cursor: 'pointer' }}/>
        </div>
      </div> 

      <table className='admin-airlist'>
        <thead>
          <tr>
            <th style={{width:'20px'}}>
              <input type="checkbox" 
                     checked={currentList.length > 0 && selectedRows.length === currentList.length} 
                     onChange={handleSelectAll} />
            </th>
            <th style={{width:'50px'}}>No</th>
            <th style={{width:'300px'}}>제목</th>
            <th style={{width:'130px'}}>등록일</th>
          </tr>
        </thead>
        <tbody>
          {currentList && currentList.map((data, idx)=>(
            <tr key={idx}>
              <td>
                <input type="checkbox" 
                       checked={selectedRows.includes(data.num)}
                       onChange={()=> handleSelectRow(data.num)} />
              </td>
              <td>{data.no}</td>
              <td  onClick={()=>navigate(`/admin/notice/:${data.num}`)}>
                <span className='admin-notice-title'>{data.title}</span>
              </td>
              <td>{data.reg_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='admin-airlist-bottom'>
        <div className='admin-delete-btn'>
          <button type='button' onClick={handleDelete}>삭제</button>
        </div>
        <div className='custom-pagination'>
          <button onClick={goToPrevBlock} disabled={block ===0}><FiChevronLeft /></button>
          {getPageNumbers().map((num) => (
            <button key={num}
                    onClick={() => setPage(num)}
                    className={page === num ? 'active' : ''}>{num}</button>
          ))}
          <button onClick={goToNextBlock} disabled={(block + 1) * pageBlockSize >= totalPages}><FiChevronRight /></button>
        </div>
        <div className='admin-insert-btn'>
          <button onClick={()=> navigate('/admin/notice/add')}>등록</button>
        </div>
      </div>
    </div>
  );
}



