import React, {useEffect, useState} from 'react'
import { getAllDHBItems, saveAllDHBItems } from '../api/dataRetrive'

function ItemLoadAndUpdate() {
    const [items, setItems] = useState([]);
    const [saveMsg, setSaveMsg] = useState("");
    var resNum = 0;


    const handleChange = (e) => {
        let singleItems = [...items];
        let singleItem = {...items[e.target.name], [e.target.title]:e.target.value};
        singleItems[e.target.name] = singleItem;
        setItems(singleItems)
    }

    const handleClick = async () => {
        resNum = await saveAllDHBItems(items);
        if(resNum === 204) {
            setSaveMsg("Saved.");
            setTimeout(()=>setSaveMsg(""), 1500)
            resNum = 0;
        } else {
            setSaveMsg("Fail to save, please check the backend.");
            resNum = 0;
        }
    }


    useEffect(async () => {
        var data = await getAllDHBItems()
        await setItems(data)
    },[])

    return (
        <div className="itemLoadAndUpdateContainer">
            <div style={{position:'fixed'}}><button onClick={handleClick}>Save</button><span><strong>   {saveMsg}</strong></span></div>
            <br/>
            <br/>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Evidence</th>
                        <th>Comment</th>
                        <th>Manu Number</th>
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
                    <td>{index}</td> 
                    <td><input className="evidenceIpt" value={element.evidence} name={index} title="evidence" onChange={(e)=>handleChange(e)} onClick={()=>navigator.clipboard.writeText(element.evidence)}></input></td>
                    <td><input className="commentIpt" value={element.itemComment} name={index} title="itemComment" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input className="manuNumIpt" value={element.manufacturerPartNum} name={index} title="manufacturerPartNum" onChange={(e)=>handleChange(e)} onClick={()=>navigator.clipboard.writeText(element.manufacturerPartNum)}></input></td>
                    <td><input className="fNameIpt" value={element.functionalName} name={index} title="functionalName" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input className="vIpt" value={element.variant} name={index} title="variant" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input className="sBNameIpt" value={element.subBrandName} name={index} title="subBrandName" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input className="bNameIpt" value={element.brandName} name={index} title="brandName" onChange={(e)=>handleChange(e)}></input></td>
                    <td><input className="nCIpt" value={element.netContent} name={index} title="netContent" onChange={(e)=>handleChange(e)}></input></td>
                    </tr>
                    ):<div></div>}
              </tbody>
            </table>
        </div>
    )
}

export default ItemLoadAndUpdate