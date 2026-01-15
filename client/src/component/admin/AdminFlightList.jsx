import React, { useEffect, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export default function AdminAirRegister() {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState([]);
  const [searchType, setSearchType] = useState('default');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [ currentList, setCurrentList ] = useState(formData); // pageNation
  const [ page, setPage ] = useState(1); 
  const [block, setBlock] = useState(0);
  const itemsPerPage = 10; // 페이지당 개수
  const pageBlockSize = 10;
  const totalPages = Math.ceil(formData.length / itemsPerPage);

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   
  useEffect(()=>{
    setCurrentList(formData.slice(indexOfFirstItem, indexOfLastItem));
  },[page, formData]);

  useEffect(()=>{
    axios.post('http://localhost:9000admin/flight')
         .then((res)=>setFormData(res.data))
         .catch((error)=>console.log(error))
  },[]);

  const handleSelectAll = () => {
    if (selectedRows.length === currentList.length) {
      setSelectedRows([]);
    } else {
      const deleteList = currentList.map(item => item.fnum);
      setSelectedRows(deleteList);
    }
  };
  
  const handleSelectRow = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) 
                            : [...prev, id] );
  }

  const getPageNumbers = () => {
    const start = block * pageBlockSize + 1;
    const end = Math.min(start + pageBlockSize - 1, totalPages);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const goToPrevBlock = () => {
    if (block > 0) {
      const newBlock = block - 1;
      setBlock(newBlock);
      setPage(newBlock * pageBlockSize + 1);
    }
  };

  const goToNextBlock = () => {
    if ((block + 1) * pageBlockSize < totalPages) {
      const newBlock = block + 1;
      setBlock(newBlock);
      setPage(newBlock * pageBlockSize + 1);
    }
  };

  /* 검색 이벤트 */
  const handleSearch = async() => {
    if (searchType === 'default' || !searchKeyword.trim()) {
      try {
        const res = await axios.post('http://localhost:9000admin/flight');
        setFormData(res.data);
        setPage(1);
        setBlock(0);
        return;
      } catch (error) {
        console.error(error);
        alert('전체 리스트 조회 중 오류가 발생했습니다.');
        return;
      }
    }

    try {
      const res = await axios.post('http://localhost:9000admin/flight/search', {
        type: searchType,
        keyword: searchKeyword.trim()
      });
      setFormData(res.data);
      setPage(1);
      setBlock(0);
    } catch (error) {
      console.error(error);
      alert('검색 중 오류가 발생했습니다.');
    }
  };
  

  /* 삭제 이벤트 */
  const handleDelete = async() =>{
    if(selectedRows.length === 0){
      alert('삭제할 항목을 선택하세요.');
      return;
    }
    try {
      const result = await axios.post('http://localhost:9000admin/deleteFlightList', {fnums:selectedRows});
      if(result.data !== 0){
        alert('삭제가 완료되었습니다.');
        const res = await axios.post('http://localhost:9000admin/flight');
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
          항공권 관리
        </div>
        <div className='admin-airlist-controls'>
          <select className='admin-select-option' 
                  value={searchType} 
                  onChange={(e) => setSearchType(e.target.value)}>
            <option value="default">선택</option>
            <option value="departure_location">출발지</option>
            <option value="arrive_location">도착지</option>
            <option value="fnum">비행번호</option>
          </select>
          <input type="text" 
                 className='admin-search' 
                 value={searchKeyword}
                 onChange={(e) => setSearchKeyword(e.target.value)}
                 placeholder='검색어를 입력하세요'
                 onKeyDown={(e) => {if (e.key === 'Enter') handleSearch()}}/>
          <IoMdSearch className='admin-search-icon' onClick={handleSearch} style={{ cursor: 'pointer' }}/>
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
            <th style={{width:'200px'}}>출발지</th>
            <th style={{width:'200px'}}>도착지</th>
            <th style={{width:'230px'}}>비행번호</th>
            <th style={{width:'200px'}}>출발날짜</th>
            <th style={{width:'150px'}}>가격</th>
          </tr>
        </thead>
        <tbody>
          {currentList && currentList.map((data, idx)=>(
            <tr key={idx}>
              <td style={{width:'20px'}}>
                <input type="checkbox"
                       checked={selectedRows.includes(data.fnum)}
                       onChange={() => handleSelectRow(data.fnum)} />
              </td>
              <td style={{width:'50px'}}>{data.no}</td>
              <td style={{width:'200px'}}>{data.departure_location}({data.d_acode})</td>
              <td style={{width:'200px'}}>{data.arrive_location}({data.a_acode})</td>
              <td style={{width:'230px'}}>{data.fnum}</td>
              <td style={{width:'200px'}}>{data.departure_date}</td>
              <td style={{width:'150px'}}>{data.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='admin-airlist-bottom'>
        <div className='admin-delete-btn'>
          <button type='button' onClick={handleDelete}>삭제</button>
        </div>
        <div className='custom-pagination'>
          <button onClick={goToPrevBlock} disabled={block === 0}><FiChevronLeft /></button>
          {getPageNumbers().map((num) => (
            <button key={num}
                    onClick={() => setPage(num)}
                    className={page === num ? 'active' : ''}>{num}</button>
          ))}
          <button onClick={goToNextBlock} disabled={(block + 1) * pageBlockSize >= totalPages}>
            <FiChevronRight />
          </button>
        </div>
        <div className='admin-insert-btn'>
          <button onClick={()=>navigate('/admin/flight/add')}>등록</button>
        </div>
      </div>
    </div>
  );
}

