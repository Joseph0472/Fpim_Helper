const encodeQueryData = (qdata) => {
    const ret = [];
    for (let d in qdata)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(qdata[d]));
    return ret.join('&');
}

export const searchByKeyWords = async (queryObj) => {
  if(!queryObj.manufacturerPartNum && !queryObj.functionalName && !queryObj.variant && !queryObj.subBrandName && !queryObj.brandName) {return {fpim: [], onelink: []}}
  const queryStrData = {'manufacturerPartNum': queryObj.manufacturerPartNum, 'functionalName': queryObj.functionalName, 'variant': queryObj.variant, 'subBrandName': queryObj.subBrandName, 'brandName': queryObj.brandName}
  const querystring = encodeQueryData(queryStrData);
  const response = await fetch('/fpim/query?' + querystring)
  const data = await response.json();
  return data;
}

//L&M
export const getAllDHBItems = async () => {
  const response = await fetch('/dhb')
  const data = await response.json();
  return data;
}

export const saveAllDHBItems = async (items) => {
  const response = await fetch('/dhb', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items) 
  })
  console.log(response.status)
  return response.status
}