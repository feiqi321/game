const baseURL='https://www.isxcxbackend1.cn';

export default function httpReq({method='POST',url,data={},success,_url}) {
  return new Promise((resolve)=>{
    wx.request({
      method,
      url: _url || `${baseURL}${url}`,
      data:{
        openId:wx.getStorageSync("openId"),
        gameId:wx.getStorageSync("gameId"),
        ...data
      },
      success({data}){
        resolve(data);
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

