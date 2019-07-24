import { Injectable, NgZone } from '@angular/core';
import { LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';


declare var firebase;
declare var google;
/*
  Generated class for the HubsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HubsProvider {
  stayLoggedIn;
  orgArray = new Array();
  orgNames = new Array();
  constructor(public ngzone: NgZone, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public geo: Geolocation) {
    console.log('Hello HubsProvider Provider');
  }
  SignIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  checkstate() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            this.stayLoggedIn = 1
          }
          else {
            this.stayLoggedIn = 0
          }
          resolve(this.stayLoggedIn)
        })
      })
    })
  }

  forgetPassword(email) {

    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve();
      }, (error) => {
        reject(error)
      })

    })

  }


  checkAuthState() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            accpt(true)
          } else {
            accpt(false)
          }
        });
      });
    });
  }




  getProfile() {
    return new Promise((accpt, rej) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            firebase.database().ref("Users/" + "/" + "App_Users/" + user.uid).on('value', (data: any) => {
              let details = data.val();
              if (data.val() != null || data.val() != undefined) {
                // console.log(details)
                accpt(details.downloadurl)
              }
              else {
                details = null
              }

              // console.log(details.downloadurl)
            })
          } else {
            // console.log('no user');
          }
        });
      })
    })
  }


  getUserLocation() {
    return new Promise((resolve, reject) => {
      this.geo.getCurrentPosition().then((resp) => {
        resolve(resp)
      }).catch((error) => {
        resolve(null)
        // console.log('Error getting location', error);
      });
    })
  }


  Signup(email, password) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Signing up...',
          duration: 4000000
        });
        loading.present();
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
          var user = firebase.auth().currentUser
          firebase.database().ref("Users/App_Users/" + user.uid).set({
            email: email,
            downloadurl: "../../assets/download.png",
            cell: ""
          })
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
            // An error happened.
          });
          resolve();
          loading.dismiss();
        }).catch((error) => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            cssClass: 'myAlert',
            subTitle: error.message,
            buttons: [
              {
                text: 'ok',
                handler: data => {
                  // console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
          // console.log(error);
        })
      })
    })
  }
  checkVerification() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user.emailVerified == false) {
          this.logout();
          resolve(0)
        }
        else {
          resolve(1)
        }
      })
    })
  }
  logout() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().signOut();
        resolve()
      });
    })
  }

  getCurrentLocation(lat, lng) {
    return new Promise((accpt, rej) => {
      this.createPositionRadius(lat, lng).then((data: any) => {
        accpt(data);
      })
    })

  }


  createPositionRadius(latitude, longitude) {
    var leftposition, rightposition, downposition, uposititon;
    return new Promise((accpt, rej) => {
      var downlat = new String(latitude);
      var latIndex = downlat.indexOf(".");
      var down = parseInt(downlat.substr(latIndex + 1, 2)) + 6;
      var down = parseInt(downlat.substr(latIndex + 1, 2)) + 12;
      if (down >= 100) {
        if (downlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(downlat.substr(0, 3)) + 1;
        }
        else {
          var firstDigits = parseInt(downlat.substr(0, 2)) - 1;
        }
        var remainder = down - 100;
        if (remainder >= 10) {
          downposition = firstDigits + "." + remainder;
        }
        else {
          downposition = firstDigits + ".0" + remainder;
        }

      } else {
        if (downlat.substr(0, 1) == "-") {
          downposition = downlat.substr(0, 3) + "." + down;
        }
        else {
          downposition = downlat.substr(0, 2) + "." + down;
        }

      }

      //up  position
      var uplat = new String(latitude);
      var latIndex = uplat.indexOf(".");
      var up = parseInt(uplat.substr(latIndex + 1, 2)) - 6;
      var up = parseInt(uplat.substr(latIndex + 1, 2)) - 12;
      if (up <= 0) {
        if (uplat.substr(0, 1) == "-") {
          var firstDigits = parseInt(uplat.substr(0, 3)) + 1;
        }
        else {
          var firstDigits = parseInt(uplat.substr(0, 2)) - 1;
        }
        var remainder = down - 100;
        if (remainder >= 10) {
          uposititon = firstDigits + "." + remainder;
        }
        else {
          uposititon = firstDigits + ".0" + remainder;
        }
      } else {
        if (uplat.substr(0, 1) == "-") {
          uposititon = uplat.substr(0, 3) + "." + up;
        }
        else {
          uposititon = uplat.substr(0, 2) + "." + up;
        }

      }
      //left position
      var leftlat = new String(longitude);
      var longIndex = leftlat.indexOf(".");
      var left = parseInt(leftlat.substr(longIndex + 1, 2)) - 6;
      var left = parseInt(leftlat.substr(longIndex + 1, 2)) - 12;
      if (left >= 100) {
        if (leftlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(leftlat.substr(0, 3)) - 1;
        } else {
          var firstDigits = parseInt(leftlat.substr(0, 2)) + 1;
        }
        var remainder = left - 100;
        leftposition = firstDigits + ".0" + remainder;
      } else {
        if (leftlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(leftlat.substr(0, 3)) + 1;
        }
        else {
          var firstDigits = parseInt(leftlat.substr(0, 2)) - 1;
        }

        if (left == 0) {
          var remainder = 0;
        }
        else {
          var remainder = left - 12;
        }

        leftposition = firstDigits + ".0" + remainder;

      }
      //right position
      var rightlat = new String(longitude);
      var longIndex = rightlat.indexOf(".");
      var right = parseInt(rightlat.substr(longIndex + 1, 2)) + 6;
      var right = parseInt(rightlat.substr(longIndex + 1, 2)) + 12;
      if (right >= 100) {
        if (rightlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(rightlat.substr(0, 3)) - 1;
        } else {
          var firstDigits = parseInt(rightlat.substr(0, 2)) + 1;
        }
        var remainder = right - 100;
        rightposition = firstDigits + ".0" + remainder;
      } else {
        rightposition = rightlat.substr(0, 2) + "." + right;
        if (left == 0) {
          var remainder = 0;
        }
        else {
          var remainder = left - 12;
        }

        rightposition = firstDigits + ".0" + remainder;
      }
      let radius = {
        left: leftposition,
        right: rightposition,
        up: uposititon,
        down: downposition
      }
      accpt(radius);
      // down  position
    })

  }

  getLocation(lat, lng) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var geocoder = new google.maps.Geocoder;
        var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
          var address = results[0].address_components[3].short_name;
          resolve(address)
        }, 4000);

      })
    })
  }



  getPrograme() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("programmes").on("value", (data: any) => {
          if (data.val() != undefined) {
            var progs = new Array();
            var details = data.val();
            console.log(details)
            var keys = Object.keys(details);
            console.log(keys)
            for (var x = 0; x < keys.length; x++) {
              firebase.database().ref("programmes/" + keys[x]).on("value", (data2: any) => {
                var details2 = data2.val();
                console.log(details2)
                var keys2 = Object.keys(details2);
                console.log(keys2)
                for (var p = 0; p < keys2.length; p++) {
                  console.log(keys2[p])
                  var k = keys2[p];
                  var progObject = {
                    openDate: details2[k].openDate,
                    closeDate: details2[k].closeDate,
                    progName: details2[k].progName,
                    progType: details2[k].progType,
                    progBackround: details2[k].progBackround,
                    benefits: details2[k].benefits,
                    desc: details2[k].desc,
                    progStartDate: details2[k].progStartDate,
                    progEndDate: details2[k].progEndDate,
                    address: details2[k].address,
                    contacts: details2[k].contacts,
                    img: details2[k].img,
                  }
                  progs.push(progObject)
                  console.log(progs)
                }
              })
            }
            resolve(progs);
          }
        })
      })
    })
  }





  getJobs() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("jobs").on("value", (data: any) => {
          if (data.val() != undefined) {
            var jobs = new Array();
            var details = data.val();
            console.log(details)
            var keys = Object.keys(details);
            console.log(keys)
            for (var x = 0; x < keys.length; x++) {
              firebase.database().ref("jobs/" + keys[x]).on("value", (data2: any) => {
                var details2 = data2.val();
                console.log(details2)
                var keys2 = Object.keys(details2);
                console.log(keys2)
                for (var p = 0; p < keys2.length; p++) {
                  console.log(keys2[p])
                  var k = keys2[p];
                  var progObject = {
                    openDate: details2[k].openDate,
                    closeDate: details2[k].closeDate,
                    benefits: details2[k].benefits,
                    desc: details2[k].desc,
                    jobStartdate: details2[k].jobStartdate,
                    jobEndDate: details2[k].jobEndDate,
                    address: details2[k].address,
                    contacts: details2[k].contacts,
                    img: details2[k].img,
                    name : details2[k].name
                  }
                  jobs.push(progObject)
                  console.log(jobs)
                }
              })
            }
            resolve(jobs);
          }
        })
      })
    })
  }

  getServices() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("services").on("value", (data: any) => {
          if (data.val() != undefined) {
            var services = new Array();
            var details = data.val();
            console.log(details)
            var keys = Object.keys(details);
            console.log(keys)
            for (var x = 0; x < keys.length; x++) {
              firebase.database().ref("services/" + keys[x]).on("value", (data2: any) => {
                var details2 = data2.val();
                console.log(details2)
                var keys2 = Object.keys(details2);
                console.log(keys2)
                for (var p = 0; p < keys2.length; p++) {
                  console.log(keys2[p])
                  var k = keys2[p];
                  var progObject = {
                    openDate: details2[k].openDate,
                    closeDate: details2[k].closeDate,
                    desc: details2[k].desc,
                    address: details2[k].address,
                    contacts: details2[k].contact,
                    img: details2[k].img,
                    serviceName: details2[k].name,
                    email: details2[k].email
                  }
                  services.push(progObject)
                  console.log(services)
                }
              })
            }
            resolve(services);
          }
        })
      })
    })
  }


  getAllOrganizations() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("Organizations").on("value", (data: any) => {
          if (data.val() != null) {
            this.orgArray.length = 0;
            // this.orgNames.length = 0;
            let displayDetails = data.val();
            console.log(displayDetails)
            let keys = Object.keys(displayDetails);
            console.log(keys)
            for (var x = 0; x < keys.length; x++) {
              let orgObject = {
                address: displayDetails[keys[x]].address,
                background: displayDetails[keys[x]].background,
                category: displayDetails[keys[x]].category,
                contact: displayDetails[keys[x]].contact,
                downloadurl: displayDetails[keys[x]].downloadurl,
                downloadurlLogo: displayDetails[keys[x]].downloadurlLogo,
                email: displayDetails[keys[x]].email,
                freeWifi: displayDetails[keys[x]].freeWifi,
                name: displayDetails[keys[x]].name,
                lat: displayDetails[keys[x]].lat,
                long: displayDetails[keys[x]].long,
                id: keys[x],
                region: displayDetails[keys[x]].region,
                website: displayDetails[keys[x]].website,
                wifi: displayDetails[keys[x]].wifi,
                wifiRange: displayDetails[keys[x]].wifiRange,
            
              }
              // this.storeOrgNames(displayDetails[keys[x]].category);
              this.orgArray.push(orgObject)
              console.log(this.orgArray)
            }
            resolve(this.orgArray)
          }
        });
      })
    })
  }

  storeOrgNames(cat) {
    if (cat != undefined)
    this.orgNames.push(cat);
  }

  getName(){
    return this.orgNames;
  }


  getPrograme2() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("programmes/" + user.uid).on("value", (data: any) => {
          if (data.val() != undefined) {
            var progs = new Array();
            var details = data.val();
            var keys = Object.keys(details);
            for (var x = 0; x < keys.length; x++) {
              var k = keys[x];
              var progObject = {
                openDate: details[k].openDate,
                closeDate: details[k].closeDate,
                name: details[k].progName,
                progType: details[k].progType,
                background: details[k].progBackround,
                benefits: details[k].benefits,
                desc: details[k].desc,
                progStartDate: details[k].progStartDate,
                progEndDate: details[k].progEndDate,
                address: details[k].address,
                contacts: details[k].contacts,
                img: details[k].img,
              }
               this.storeOrgNames(details[k].progName);
              progs.push(progObject)
            }
            resolve(progs);
          }
        })
      })
    })
  }





  getJobs2() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("jobs/" + user.uid).on("value", (data: any) => {
          if (data.val() != undefined) {
            var jobs = new Array();
            var details = data.val();
            var keys = Object.keys(details);
            for (var x = 0; x < keys.length; x++) {
              var k = keys[x];
              var jobObject = {
                openDate: details[k].openDate,
                closeDate: details[k].closeDate,
                benefits: details[k].benefits,
                desc: details[k].desc,
                jobStartdate: details[k].jobStartdate,
                jobEndDate: details[k].jobEndDate,
                address: details[k].address,
                contacts: details[k].contacts,
                img: details[k].img,
                name : details[k].name
              }
              this.storeOrgNames(details[k].name);
              jobs.push(jobObject)
            }
            resolve(jobs);
          }
        })
      })
    })
  }


 

  getServices2() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("services/" + user.uid).on("value", (data: any) => {
          if (data.val() != undefined) {
            var services = new Array();
            var details = data.val();
            var keys = Object.keys(details);
            for (var x = 0; x < keys.length; x++) {
              var k = keys[x];
              var serviceObject = {
                openDate: details[k].openDate,
                closeDate: details[k].closeDate,
                desc: details[k].desc,
                address: details[k].address,
                contacts: details[k].contact,
                img: details[k].img,
                name: details[k].name,
                email: details[k].email
              }
              this.storeOrgNames(details[k].name);
              services.push(serviceObject)
            }
            resolve(services);
          }
        })
      })
    })
  }

}
