import * as React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Box from '@mui/material/Box';
import getData from '../getData';
import '@splidejs/react-splide/css';
import { Typography } from '@mui/material';

export function StationSlide() {
    var slideData = []

    function getFavoriteList() {
        var favoriteStations = JSON.parse(localStorage.getItem("favoriteStations"))
        if (favoriteStations) {

        } else {
            localStorage.setItem("favoriteStations", "[]")
            favoriteStations = JSON.parse(localStorage.getItem("favoriteStations"))
            return favoriteStations
        }
        return favoriteStations
    }

    function getCityName(stationUID) {

        var cityCode = stationUID.slice(0, 3)
        var citys = ["Taichung", "Hsinchu", "MiaoliCounty", "NewTaipei", "PingtungCounty", "KinmenCounty", "Taoyuan", "Taipei", "Kaohsiung", "Tainan", "Chiayi", "HsinchuCounty"]
        var codes = ["TXG", "HSZ", "MIA", "NWT", "PIF", "KIN", "TAO", "TPE", "KHH", "TNN", "CYI", "HSQ"]
        return (citys[codes.indexOf(cityCode)])
    }

    React.useEffect(() => {
        var FavoriteData = getFavoriteList()
        for (let i = 0; i < FavoriteData.length; i++) {
            getData(
                `https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/${getCityName(FavoriteData[i].uid)}?%24filter=StationUID%20eq%20%27${FavoriteData[i].uid}%27&%24format=JSON`,
                (res) => { slideData.push({ name: FavoriteData[i].name, bikes: res }); console.log(slideData) },
                (...errors) => { }
            )
        }
    }, [])

    React.useEffect(() => { console.log(slideData) }, [slideData])

    //TODO:GET DATA FROM TDX FOR EVERY SLIDE.
    //TODO:MAKE A LAZY LOAD WHICH JUST LOAD THE SLIDES THAT ARE VISABLE TO USERS.


    return (
        <>
            {slideData.length < 1 ? <>添加站點到我的最愛之後，就會顯示在這裡</> :
                <Splide>

                    {slideData.map((d, i) => {
                        return (
                            <SplideSlide>
                                <Typography textAlign={"center"} variant='h5'>{d.name}</Typography>
                                <p>一般:{-1}</p>
                                <p>電輔:{-1}</p>
                                <p>空位:{-1}</p>
                            </SplideSlide>
                        )
                    })}
                </Splide>
            }
        </>
    )
}