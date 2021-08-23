import React, {useEffect, useState} from 'react'
import { getAllDHBItems, saveAllDHBItems } from '../api/dataRetrive'

function ItemLoadAndUpdate() {
    const [items, setItems] = useState([])

    // const handleChange = (e) => {
    //     //setItems(...items, items[])
    //     console.log(e.target.name)    
    // }

    const handleChange = (e) => {
        console.log(e.target.name + e.target.title)
        let singleItems = [...items];
        let singleItem = {...items[e.target.name], [e.target.title]:e.target.value};
        singleItems[e.target.name] = singleItem;
        setItems(singleItems)
    }

    const handleClick = () => {
        saveAllDHBItems(items)
    }

    useEffect(async () => {
        var data = await getAllDHBItems()
        await setItems(data)
        await console.log(data)
    },[])

    return (
        <div className="itemLoadAndUpdateContainer">
            <button onClick={handleClick}>Save</button>
            <br/>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>Evidence</th>
                        <th>Comment</th>
                        <th>Manufacturer Number</th>
                        <th>Functional Name</th>
                        <th>Variant</th>
                        <th>Sub-Brand Name</th>
                        <th>Brand Name</th>
                        <th>Net Content</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length <= 10000 ?
                    items.map((element, index) =>
                    <tr> 
                    <td><input value={element.evidence} name={index} title="evidence" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input value={element.itemComment} name={index} title="itemComment" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input value={element.manufacturerPartNum} name={index} title="manufacturerPartNum" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input value={element.functionalName} name={index} title="functionalName" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input value={element.variant} name={index} title="variant" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input value={element.subBrandName} name={index} title="subBrandName" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input value={element.brandName} name={index} title="brandName" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input value={element.netContent} name={index} title="netContent" onChange={(e)=>handleChange(e)}></input></td>
                    </tr>
                    ):<div></div>}
                <button>save</button>
              </tbody>
            </table>
        </div>
    )
}

export default ItemLoadAndUpdate