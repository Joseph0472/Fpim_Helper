import React, {useEffect, useState} from 'react'
import { searchByKeyWords } from '../api/dataRetrive'
import ScrollToTopBtn from './ScrollToTopBtn'

const Input = () => {
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

  const submitReq = (e) => {    
      setItemInfo({...itemInfo, [e.target.name]: e.target.value})
  }

  var inputDebounceFn = debounce(submitReq, 500);
  

  const handleClick = () => {
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
      <div>
        <div className="inputContainer">
        <div>
              Manufacturer Part Number: {itemInfo.manufacturerPartNum} <br/>
              <input className="input" name="manufacturerPartNum" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          </div>
          <div>
              Functional Name: {itemInfo.functionalName} <br/>
              <input className="input" name="functionalName" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          </div>
          <div>
              Variant: {itemInfo.variant} <br/>
              <input className="input" name="variant" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          </div>
          <div>
              Sub Brand Name: {itemInfo.subBrandName} <br/>
              <input className="input" name="subBrandName" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          </div>
          <div>
              Brand Name: {itemInfo.brandName} <br/>
              <input className="input" name="brandName" onKeyUp={(e) => {inputDebounceFn(e)}}></input>
          </div>

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
              ) : <tr><h1>Too many results</h1></tr>}
              <br/>
              <br/>
              <tr><strong>OneLink Info</strong></tr>
              <br/>
              <br/>
              <tr>
                <th>Manu Number</th>
                <th>Onelink Code</th>
                <th>Description</th>
                <th>Brand Name</th>
                <th>Net Content</th>
              </tr>
              {itemsOtherSource.length <= 1000 ? itemsOtherSource.map(element => 
              <tbody>
                <td>{element.manufacturerPartNum}</td>
                <td>{element.onelinkCode}</td>
                <td>{element.description}</td>
                <td>{element.brandName}</td>
                <td>{element.netContent}</td>
              </tbody>
              ): <tr><h1>Too many results</h1></tr>}
          </table>
          :
          <div><p>No results found.</p></div>}
        </div>
        <ScrollToTopBtn />
      </div>
  )
}

export default Input
