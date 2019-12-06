import axios from 'axios'


export default class DataGetter {
  constructor(loaded) {
    new Promise((resolve) => {
      axios.get('https://api.spacexdata.com/v3/launches')
        .then(resL => {
          let launches = resL.data
          new Promise((resolve) => {
            axios.get('https://api.spacexdata.com/v3/rockets')
              .then(resR => {
                let rockets = resR.data
                let museumData = []
                rockets.forEach(rocket => {
                  let aRocket = {
                    rocket_name: rocket.rocket_name,
                    rocket_id: rocket.rocket_id,
                    missions: []
                  }
                  launches.forEach(launch => {
                    if (rocket.rocket_id === launch.rocket.rocket_id) {
                      aRocket.missions.push(launch)
                    }
                  });
                  museumData.push(aRocket)
                });
                loaded(museumData)
              })
          })
        })
    })
  }
}