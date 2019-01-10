const baseURL='https://www.isxcxbackend1.cn';

export default function httpReq({method='POST',url,data={},success,_url}) {
  return new Promise((resolve)=>{
    wx.request({
      method,
      url: _url || `${baseURL}${url}`,
      data:{
        openId:1,
        gameId:"dce09194d7eb",
        ...data
      },
      success({data}){
        if (data.code == 200) {resolve(data);}
        else{console.log(data.msg)}
      },
      fail(){
        console.log(url+'服务调用失败');
        resolve();
      },
      complete(){
      
      },
    })
  })
};

