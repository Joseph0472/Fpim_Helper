import React, {useEffect, useState} from 'react'
import { searchByKeyWords } from '../api/dataRetrive'
import ScrollToTopBtn from './ScrollToTopBtn'

const ItemQuery = () => {
  const [itemInfo, setItemInfo] = useState({
    manufacturerPartNum:"", // Can be one link code
    functionalName: "",
    variant: "",
    subBrandName: "",
    brandName: "",
  })
  const [items, setItems] = useState([])
  const [itemsOtherSource, setItemsOtherSource] = useState([])

  // Debounced request sending
  const debounce = (fn, delay) => {
    var timer;
    return (e)=>{
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(e);
      }, delay);
    }
  }

  const updateQueryInfo = (e) => {    
      setItemInfo({...itemInfo, [e.target.name]: e.target.value})
  }

  var inputDebounceFn = debounce(updateQueryInfo, 500);
  

  const handleClick = (e) => {
    setItemInfo({
      manufacturerPartNum:"",
      functionalName: "",
      variant: "",
      subBrandName: "",
      brandName: "",
    })
  }

  useEffect(async ()=>{
    var data = await searchByKeyWords(itemInfo);
    await setItems(data.fpim)
    await setItemsOtherSource(data.onelink)
  },[itemInfo])
    
  return (
      <div className="queryContainer">
        <div className="inputContainer">
          <input className="input" name="manufacturerPartNum" placeholder="Manufacturer Part Number" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          <input className="input" name="functionalName" placeholder="Functional Name" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          <input className="input" name="variant" placeholder="Variant" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          <input className="input" name="subBrandName" placeholder="Sub Brand Name" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          <input className="input" name="brandName" placeholder="Brand Name" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          <button onClick={handleClick}>Clear All</button>
        </div>
        <div className="resultContainer">
          {items.length !== 0 || itemsOtherSource.length !== 0?
            <table>
              <tr>
                <th>Item Number</th>
                <th>Manu Number</th>
                <th>Functional Name</th>
                <th>Variant</th>
                <th>Sub Brand Name</th>
                <th>Brand Name</th>
                <th>Net Content</th>
              </tr>
              {items.length <= 10000 ? items.map(element => 
              <tbody>
                <td>{element.itemNumber}</td>
                {/* <td>{element.itemDescription}</td> */}
                <td>{element.manufacturerPartNum}</td>
                <td>{element.functionalName}</td>
                <td>{element.variant}</td>
                <td>{element.subBrandName}</td>
                <td>{element.brandName}</td>
                <td>{element.netContent}</td>
              </tbody>
              ) : <tr><h1>Too many results, add details</h1></tr>}
              <br/>
              <br/>
              <h3><strong>OneLink</strong></h3>
              <br/>
              <br/>
              <tr>
                <th>Manu Number</th>
                <th>Onelink Code</th>
                <th>Description</th>
                <th>Brand Name</th>
                <th>Net Content</th>
              </tr>
              {itemsOtherSource.length <= 10000 ? itemsOtherSource.map(element => 
              <tbody>
                <td>{element.manufacturerPartNum}</td>
                <td>{element.onelinkCode}</td>
                <td>{element.description}</td>
                <td>{element.brandName}</td>
                <td>{element.netContent}</td>
              </tbody>
              ): <tr><h1>Too many results, add details</h1></tr>}
          </table>
          :
          <div><p>No results found.</p></div>}
        </div>
        <ScrollToTopBtn />
      </div>
  )
}

export default ItemQuery
