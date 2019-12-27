// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../libs/bmap-wx.min.js');
var wxMarkerData = [];
var provincial_capital=[];
var num = 0;
var cityadress=["石家庄","太原","太原","呼和浩特","沈阳","长春","哈尔滨","南京","杭州","合肥","福州","南昌","济南","郑州","武汉","长沙","广州","南宁","海口","成都","贵阳","昆明","拉萨","西安","兰州","西宁","银川","乌鲁木齐","台北","北京","上海","重庆","天津"];
// 新建百度地图对象 
var BMap = new bmap.BMapWX({
  ak: 'vCSzKcGRef1sGtkWEN1nFawMEYG03i4f'
});
Page({
  data: {
    markers: [],
    latitude: "",
    longitude: "",
    rgcData: {},
    weatherData: "",
    cityname:"",
    pm:"",
    date:"",
    temperature:"",
    weather:"",
    weather_id:1,
    weather_pic: "../img/weather_1.png",
  },
  // 标志物点击事件函数
  makertap: function(e) {
   // var that = this;
    var id = e.markerId;
    that.setData({
      latitude: that.data.markers[id].latitude
    });
    that.setData({
      longitude: that.data.markers[id].longitude
    });
    // 通过传参数:经纬度  获取天气  并设置天气的函数
    that.display_weather(that.data.markers[id].latitude, that.data.markers[id].longitude);
  },
  onLoad: function() {
    var that = this;
    //逆地址查询---------------
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude,
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
      that.display_weather(wxMarkerData[0].latitude, wxMarkerData[0].longitude);
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../img/marker_red.png',
      iconTapPath: '../img/marker_yellow.png'
    });
  },
  // 点击事件  显示所有的省会城市
  clickme: function(event) {
    var that = this;
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      data.wxMarkerData[0].id = num;
      num++;
      provincial_capital.push(data.wxMarkerData[0]);
      that.setData({
        markers: provincial_capital
      });
      that.setData({
        latitude: provincial_capital[0].latitude
      });
      that.setData({
        longitude: provincial_capital[0].longitude
      });
    };
    for(var i=0;i<cityadress.length;i++){
      BMap.geocoding({
        address: cityadress[i],
        fail: fail,
        success: success,
        iconPath: '../img/marker_red.png',
        iconTapPath: '../img/marker_yellow.png',
      });
    };
    that.setData({
      markers:provincial_capital,
    })
  },
  // 点击事件  回到当前城市位置
  clickme2:function(event){
    var that=this;
    that.setData({
      markers: wxMarkerData
    });
    that.setData({
      latitude: wxMarkerData[0].latitude,
    });
    that.setData({
      longitude: wxMarkerData[0].longitude
    });
    that.display_weather(wxMarkerData[0].latitude, wxMarkerData[0].longitude);
  },
  // 设置天气的函数 
  display_weather(i,j){
    var that = this;
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      var str = weatherData.date;
      var rex = str.match(/实时：(.*)\)/)[1];
      if (weatherData.weatherDesc.length>3)
      {
        weatherData.weatherDesc = weatherData.weatherDesc.match(/(.*)转(.*)/)[1];
      }
      that.set_weatherid(weatherData.weatherDesc);
      var id = that.data.weather_id;
      that.setData({
        weatherData: weatherData
      });
      that.setData({
        cityname:weatherData.currentCity
      });
      that.setData({
        pm: weatherData.pm25
      });
      that.setData({
        date: weatherData.data
      });
      that.setData({
        temperature: rex
      });
      that.setData({
        weather: weatherData.weatherDesc
      })
      that.setData({
        weather_pic: "../img/weather_"+id+".png"
      })
    };
    BMap.weather({
      location: ""+j+","+i+"",
      fail: fail,
      success: success
    });
  },
  // 设置天气描述的id  如 晴:1; 晴的id是1
  set_weatherid(data){
    var that=this;
    if(data=="晴"){
      that.setData({
        weather_id:1
      })
    }
    else if(data=="小雨"){
      that.setData({
        weather_id:2
      })
    }
    else if (data == "中雨") {
      that.setData({
        weather_id: 2
      })
    }
    else if (data == "大雨") {
      that.setData({
        weather_id: 2
      })
    }
    else if (data == "小雪") {
      that.setData({
        weather_id: 3
      })
    }
    else if (data == "中雪") {
      that.setData({
        weather_id: 3
      })
    }
    else if (data == "大雪") {
      that.setData({
        weather_id: 3
      })
    }
    else if (data == "阴") {
      that.setData({
        weather_id: 4
      })
    }
    else if (data == "多云") {
      that.setData({
        weather_id: 5
      })
    }
    else if (data == "雾") {
      that.setData({
        weather_id: 6
      })
    }
    else{
      that.setData({
        weather_id: 1
      })
    }
  }
})