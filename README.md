# bsVue-functionConfirmation
handy function to trigger bsVue modal confirmation, support for multi language, and customizable result event to (all of your component, or local component) 


## Installation

clone/download and place it under your modules/functions directory or wherever you want to place it


## Registration

    import functionConfirmation from '~/functions/confirmation'
    
    methods: {
      ...functionConfirmation,
    }

## Parameter
  
    functionConfirmationAsk(vm, label, style, callback, isLocal)
    
    vm : reference to vue instance (usually this or vm)
    label : {
      title: your confirmation title (Object for multi language, or plain String)
      ok: ok button title (Object for multi language, or plain String)
      cancel: cancel button title (Object for multi language, or plain String)
    }
    class: {
      modal: class for modal (String)
      ok: class for ok button (String)
      cancel: class for cancel button (String)
    }
    callback: your callback value when user confirmed the confirmation (can be String, Number, Object, Functions, anything)
    isLocal: emit event to global (using vue.$root.$emit()) or local (using vue.$emit()) component. default is global
    
## Samples

    // caller
    this.functionConfirmationAsk(
      this.gvm,
      {
        title: {
          id: "Anda yakin?",
          eng: "Are you sure?
        },
        ok: {
          id: "Ya",
          eng: "Yes
        },
        cancel: {
          id: "Tidak",
          eng: "No"
        }
      },
      { ok: 'danger', cancel: 'outline-primary' },
      {
        key: 'remove',
        data: "some callback data here"
      },
       false
    )
    
    
    // listener global
    
    mounted () {
      this.$root.$on('confirmed', (e) => {
        switch (e.key) {
          case 'remove':
          // do something
          break
        default:
          console.log('Need handler on evemt : confirmed - ', e.key)
          break
        }
      })
    }
    
    destroyed () {
      this.$root.$off('confirmed')
    }
    
    
    // listener local
    
    mounted () {
      this.$on('confirmed', (e) => {
        switch (e.key) {
          case 'remove':
          // do something
          break
        default:
          console.log('Need handler on evemt : confirmed - ', e.key)
          break
        }
      })
    }
    
    destroyed () {
      this.$off('confirmed')
    }
    


  


