const encodeQueryData = (qdata) => {
    const ret = [];
    for (let d in qdata)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(qdata[d]));
    return ret.join('&');
}

export const searchByKeyWords = async (queryObj) => {
    const queryStrData = {'manufacturerPartNum': queryObj.manufacturerPartNum, 'functionalName': queryObj.functionalName, 'variant': queryObj.variant, 'subBrandName': queryObj.subBrandName, 'brandName': queryObj.brandName}
    const querystring = encodeQueryData(queryStrData);
    const response = await fetch('/fpim/query?' + querystring)
    const data = await response.json();
    return data;
}