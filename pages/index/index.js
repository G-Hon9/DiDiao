// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../libs/bmap-wx.min.js');
/*Page({
  data: {
    weatherData: '',
    city:'',
    img:"../img/weather_1.png"
  },
  onLoad: function () {
    var num = 0;
    var str = "周日 12月22日 (实时：20℃)";
    console.log(str);
    var a=str.match(/(.*)\s(.*)\s(.*)/)[3];
    var wea="多云转晴";
    var wea=wea.match(/(.*)转(.*)/)[1];
    var zhen="小雨";
    if(zhen=="小雨")
    {
      console.log("是的");
    }
    console.log("b:"+wea+"\n b.length"+wea.length);
    console.log("a:"+a);
    var rex = str.match(/实时：(.*)\)/)[1];
    var month=str.match(/ (.*)月/)[1];
    var day=str.match(/月(.*)日/);
    console.log(month +day );
    console.log(rex);
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'vCSzKcGRef1sGtkWEN1nFawMEYG03i4f'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' 
      + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' 
      + '温度：' + weatherData.temperature + '\n' + '天气：' 
      + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData
      });
      console.log(data)
    };
    // 发起weather请求
    BMap.weather(
      {
      loction: "116.43, 40.75",
      fail: fail,
      success: success
    });
  } 
})*/

const app = getApp();
const amap = app.data.amap;
const key = app.data.key;
Page({
  data: {
    address: '',
    weather: '',
    temperature: '',
    humidity: '',
    windpower: '',
    winddirection: ''
  },
  onLoad() {
    var _this = this;
    var myAmap = new amap.AMapWX({ key: key });
    myAmap.getWeather({
      type: 'live',
      success(data) {
        if (data.city) {
          _this.setData({
            address: data.liveData.city,
            humidity: data.liveData.humidity,
            temperature: data.liveData.temperature,
            weather: data.liveData.weather,
            winddirection: data.liveData.winddirection,
            windpower: data.liveData.windpower
          })
        }
      },
      fail() {
        wx.showToast({ title: '失败！' })
      }
    })
  }
})