/*
name: logout
type: functions
list of functions:
- ConfirmationAsk : do some confirmation and the actions

NOTE
-. this functions requires bootstrap vue (https://bootstrap-vue.org/)
-. vm parameters must reference to "this" variable on your page
-. bsVue used version : 2.21.x
--------
*/
import labels from '~/json/label_general'

export default {
  functionConfirmationAsk (vm, label, style, callback, isLocal) {
    const lang = vm.$store.getters['app/getLanguage']

    if (!label.title) {
      label.title = lang ? labels.confirmation[lang] : labels.confirmation
    }
    if (!label.ok) {
      label.ok = lang ? labels.yes[lang] : labels.yes
    }
    if (!label.cancel) {
      label.cancel = lang ? labels.cancel[lang] : labels.cancel
    }

    vm.$bvModal.msgBoxConfirm(label.title, {
      centered: true,
      modalClass: style.modal ? style.modal : 'confirm-modal',
      okVariant: style.ok ? style.ok : 'primary',
      cancelVariant: style.cancel ? style.cancel : 'primary',
      okTitle: label.ok,
      cancelTitle: label.cancel
    })
      .then((value) => {
        if (value) {
          if (isLocal) {
            vm.$emit('confirmed', callback)
          } else {
            vm.$root.$emit('confirmed', callback)
          }
        } else {
          // eslint-disable-next-line no-lonely-if
          if (isLocal) {
            vm.$emit('cancelled')
          } else {
            vm.$root.$emit('cancelled')
          }
        }
      })
      .catch((err) => {
        // An error occurred
        // eslint-disable-next-line no-console
        console.error(err)
        if (isLocal) {
          vm.$emit('cancelled')
        } else {
          vm.$root.$emit('cancelled')
        }
      })
  }
}
