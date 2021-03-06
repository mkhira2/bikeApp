import STORE from './store'
import {User} from './models/userModel'
import { ItemModel } from './models/itemModel'

const ACTIONS = {
  loginUser (email, password) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      User.login(email, password)
      .done(
        function () {
          location.hash = 'item'
        }
        )
      .fail(
        function (error) {
          // TODO: add error handling
        }
        )
    } else {
      document.querySelector('.loginEmailRejection').innerHTML = ' Invalid email address'
    }
  },
  registerUser (formData) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      User.register(formData)
      .done(
        function () {
          ACTIONS.loginUser(formData.email, formData.password)
        }
        )
      .fail(
        function (error) {
          // TODO: add error handling
        }
        )
    } else {
      document.querySelector('.registerEmailRejection').innerHTML = 'Invalid email address'
    }
  },
  addListing (itemData) {
    var newItem = new ItemModel(itemData)
    console.log(newItem)
    newItem.save()
      .then(
        (response) => {
          ACTION.fetchAllItems()
        },
        (err) => {
          alert('problem saving your product')
        }
      )
  },
  updateItemModel (itemAttrs) {
    var newItem = STORE.get('productToPost')
    newItem.set(itemAttrs)  // backbone set method
    STORE.set({
      productToPost: newItem
    })
  },
  fetchAllItems () {
    var itemColl = STORE.get('ItemCollection')
    itemColl.fetch()
      .then(function () {
        STORE.set({
          ItemCollection: itemColl
        })
      })
  },
  setProductImage (result) {
    STORE.set({postingBikeURL: result})
  },
  loggedInStatus: function () {
    if (User.getCurrentUser() != null) {
      STORE.set({userLoginStatus: 'Log Out'})

      return 'Log Out'
    } else {
      STORE.set({userLoginStatus: 'Log In'})

      return 'Log In'
    }
  },
  logoutUser: function () {
    User.logout()
      .done(
        function (response) {
          console.log('you logged out', response)
          ACTIONS.loggedInStatus()
          location.hash = 'login'
        })
      .fail(
        function (error) {
          console.log('problem logging out', error)
        })
  }
  // close (evtObj) {
  //   STORE.set({ showModal: false })
  // },
  // open (evtObj) {
  //   STORE.set({showModal: true})
  // }

}
ACTIONS.loggedInStatus()

export default ACTIONS
